import { DepartmentService } from "../services/department.service";
import { Request, Response, Router, NextFunction } from "express";
import HttpException from "../exception/httpException";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateDepartmentDto } from "../dto/createDepartment.dto";
import { UpdateDepartmentDto } from "../dto/updateDepartment.dto";

export class DepartmentController {
  constructor(private departmentService: DepartmentService, router: Router) {
    router.post("/", this.createDepartment.bind(this));
    router.get("/", this.getAllDepartments.bind(this));
    router.get("/:id", this.getDepartmentById.bind(this));
    router.put("/:id", this.updateDepartment);
    router.delete("/:id", this.deleteDepartment);
  }


  async createDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const createDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
      const errors = await validate(createDepartmentDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedDepartment = await this.departmentService.createDepartment(
        createDepartmentDto.deptName,
      );
      res.status(201).send(savedDepartment);
    } catch (error) {
      next(error);
    }

   }  

   async getAllDepartments(req: Request, res: Response) {
    const departments = await this.departmentService.getAllDepartments();
    res.status(200).send(departments);
  }

  async getDepartmentById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const department = await this.departmentService.getDepartmentById(id);
      if (!department) {
        throw new HttpException(404, "");
      }
      res.status(200).send(department);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new HttpException(400, "Invalid department ID");
      }
    //   const dept=await this.departmentService.getDepartmentById(id)
    // if(!dept){
    //     throw new HttpException(406, "department not found");
    // }
      const updateDepartmentDto = plainToInstance(UpdateDepartmentDto, req.body);
      console.log("updated")
      const errors = await validate(updateDepartmentDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, errors as unknown as string);
      }
      const updatedDepartment = await this.departmentService.updateDepartment(
        id,
        updateDepartmentDto.deptName
      );
      
      res.status(200).send(updatedDepartment);
    } catch (error) {
      next(error);
    }
  };

  deleteDepartment = async (req: Request, res: Response,next:NextFunction) => {
    try{const id = Number(req.params.id);
    const dept=await this.departmentService.getDepartmentById(id)
    if(!dept){
        throw new HttpException(404, "department not found");
    }
    console.log(dept.employees.length)
    if(dept.employees.length!==0){
        throw new HttpException(406, "Cannot be deleted!There are some employees in this department");
    }
    
    await this.departmentService.deleteDepartment(id);
    res.status(200).send();
    }
    catch(error) {
      next(error);
    }
  };
}




  