
import { CreateAddressDto } from "../dto/createAddress.dto";
import Address from "../entities/address.entity";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";

class EmployeeService{
    constructor (private employeeRepository:EmployeeRepository){}

    async createEmployee(name:string,email:string,age:number,address:CreateAddressDto): Promise<Employee>{
        const newEmp= new Employee();
        newEmp.name=name;
        newEmp.email=email;
        newEmp.age=age;
        const newaddress=new Address()
        newaddress.line1=address.line1
        newaddress.pincode=address.pincode
        newEmp.address=newaddress

        return this.employeeRepository.create(newEmp);
    }

    async getAllEmployees():Promise<Employee[]>{
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id:number):Promise<Employee>{
        return this.employeeRepository.findOneById(id);
    }

    async updateEmployee(id:number,name:string,email:string) {
        const existingEmployee=await this.employeeRepository.findOneById(id);
        if(existingEmployee){
            const newEmp= new Employee();
            newEmp.name=name;
            newEmp.email=email;
            await this.employeeRepository.update(id,newEmp);
        }
    }

    async deleteEmployee(id:number){
        const existingEmployee=await this.employeeRepository.findOneById(id);
        if(existingEmployee){
            await this.employeeRepository.delete(existingEmployee)
        }
    }
       
}

export default EmployeeService