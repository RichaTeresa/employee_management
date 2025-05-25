import Department from "../entities/department.entity";
import { DepartmentRepository } from "../repositories/department.repository";
import { LoggerService } from "./logger.service";

export class DepartmentService{
    private logger: LoggerService;
    constructor (private departmentRepository:DepartmentRepository){
        this.logger = LoggerService.getInstance(DepartmentService.name)
    }

    async createDepartment(deptName:string): Promise<Department>{
        const newDept= new Department();
        newDept.deptName=deptName;
        return this.departmentRepository.createDept(newDept);
    }

    async getAllDepartments():Promise<Department[]>{
        return this.departmentRepository.findManyDept();
    }

    async getDepartmentById(id:number):Promise<Department>{
        let department=await  this.departmentRepository.findOneByIdDept(id);
        if(!department){
            throw new Error("Department not found")
        }
        return department
    }

    async updateDepartment(id:number,deptName:string) {
        const existingDepartment=await this.departmentRepository.findOneByIdDept(id);
        if(existingDepartment){
            const newDept= new Department();
            newDept.deptName=deptName;
            await this.departmentRepository.updateDept(id,newDept);
        }
    }

    async deleteDepartment(id:number){
        const existingDepartment=await this.departmentRepository.findOneByIdDept(id);
        if(existingDepartment){
            await this.departmentRepository.deleteDept(existingDepartment)
        }
    }


}