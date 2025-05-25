import { JwtPayload } from "jsonwebtoken";
import HttpException from "../exception/httpException";
import EmployeeService from "./employee.service";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constraints";
import { LoggerService } from "./logger.service";

export class AuthService{
    private logger: LoggerService;
    constructor(private employeeService:EmployeeService){
        this.logger = LoggerService.getInstance(AuthService.name)
    }

    async login(email:string,password:string){
        const employee=await this.employeeService.getEmployeeByEmail(email)
        if(!employee){
            throw new HttpException(404,"no such user found")
        }

        const isPasswordValid=await bcrypt.compare(password,employee.password)

        if (!isPasswordValid){
            throw new HttpException(400,"invalid password")
        }

        const payload:JwtPayload={
            id:employee.id,
            email:employee.email,
            role:employee.role
        }
       this.logger.info(payload)
        const token=jwt.sign(payload,JWT_SECRET,{expiresIn:JWT_VALIDITY})
        return {
            tokenType:"Bearer",
            accessToken:token
        }

    }
}