import { EmployeeRole } from "../entities/employee.entity";

export class Jwtpayload{
    id:number;
    email:string;
    role:EmployeeRole;
}