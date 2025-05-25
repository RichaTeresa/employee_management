import Department from "../entities/department.entity";
import { Repository } from "typeorm";

export class DepartmentRepository{
    constructor(private repository:Repository<Department>){}

    async createDept(department:Department):Promise<Department>{
    return this.repository.save(department);
    }
    
    async findManyDept():Promise<Department[]>{
    return this.repository.find({
      relations:{
         employees:true
      }


    });
   }

   async findOneByIdDept(id:number) :Promise<Department>{
    return this.repository.findOne({
         where :{id},
         relations:{
         employees:true
      }
         
    });
   }

   async updateDept(id:number,department:Department) :Promise<void>{
    await this.repository.save({id,...department})
   }

   async deleteDept(department:Department):Promise<void>{
    await this.repository.remove(department)
   }


    
}