
import { CreateAddressDto } from "../dto/createAddress.dto";
import { CreateDepartmentDto } from "../dto/createDepartment.dto";
import { CreateEmployeeDto } from "../dto/createEmployee.dto";
import { UpdateEmployeeDto } from "../dto/updateEmployee.dto";
import Address from "../entities/address.entity";
import Department from "../entities/department.entity";
import Employee, { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import bcrypt from 'bcrypt';
import { LoggerService } from "./logger.service";
import { DepartmentService } from "./department.service";
import departmentService from "../routes/department.route";

class EmployeeService{
     private logger: LoggerService;
    constructor (private employeeRepository:EmployeeRepository){
        this.logger = LoggerService.getInstance(EmployeeService.name)
    }

    async createEmployee(employee_id:string,joiningDate:Date,status:EmployeeStatus,experience:number,name:string,email:string,age:number,role:EmployeeRole,address:CreateAddressDto,password:string,deptid:number): Promise<Employee>{
        const newEmp= new Employee();


        await departmentService.getDepartmentById(deptid)
        newEmp.employeeId=employee_id;
        newEmp.dateOfJoining=joiningDate;
        newEmp.status=status;
        newEmp.experience=experience

        newEmp.name=name;
        newEmp.email=email;
        newEmp.age=age;
        newEmp.role=role
        const newaddress=new Address()
        newaddress.houseNo=address.houseNo
        newaddress.line1=address.line1
        newaddress.line2=address.line2
        newaddress.pincode=address.pincode
        newEmp.address=newaddress
        newEmp.password=await bcrypt.hash(password,10);
        newEmp.departmentId=deptid


        return this.employeeRepository.create(newEmp);
    }

    async getAllEmployees():Promise<Employee[]>{
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id:number):Promise<Employee>{
        let employee=await  this.employeeRepository.findOneById(id);
        this.logger.info(employee)
        if(!employee){
            throw new Error("Employee not found")
        }
        return employee
    }

    async getEmployeeByEmail(email:string):Promise<Employee | null>{
        return this.employeeRepository.findOneByEmail(email);
        
    }

    async updateEmployee(id:number,employee_id:string,joiningDate:Date,status:EmployeeStatus,role:EmployeeRole,experience:number,name:string,email:string,age:number,address:CreateAddressDto,password:string,deptId:number) {
        const existingEmployee=await this.employeeRepository.findOneById(id);
        if(existingEmployee){
            existingEmployee.employeeId=employee_id;
            existingEmployee.dateOfJoining=joiningDate;
            existingEmployee.status=status;
            existingEmployee.role=role;
            existingEmployee.experience=experience
            existingEmployee.name=name;
            existingEmployee.email=email;
            existingEmployee.age=age;
            existingEmployee.address.houseNo=address.houseNo
            existingEmployee.address.line1=address.line1
            existingEmployee.address.line2=address.line2
            existingEmployee.address.pincode=address.pincode
            existingEmployee.password=password
            existingEmployee.departmentId=deptId

            await this.employeeRepository.update(id,existingEmployee);
        }
    }

    async deleteEmployee(id:number){
        const existingEmployee=await this.employeeRepository.findOneById(id);
        this.logger.info(existingEmployee)
        if(existingEmployee){
            await this.employeeRepository.delete(existingEmployee)
        }
    }
       
}

export default EmployeeService