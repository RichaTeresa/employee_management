import express from "express"
import { DepartmentRepository } from "../repositories/department.repository";
import datasource from "../db/data-source";
import Employee from "../entities/employee.entity";
import Department from "../entities/department.entity";
import { DepartmentService } from "../services/department.service";
import { DepartmentController } from "../controllers/department.controller";

export const departmentRouter=express.Router();

const departmentRepository=new DepartmentRepository(datasource.getRepository(Department))
const departmentService=new DepartmentService(departmentRepository)
const departmentController=new DepartmentController(departmentService,departmentRouter)

export default departmentService