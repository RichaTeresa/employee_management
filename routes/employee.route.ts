import express from "express"
import EmployeeRepository from "../repositories/employee.repository";
import datasource from "../db/data-source";
import Employee from "../entities/employee.entity";
import EmployeeService from "../services/employee.service";
import EmployeeController from "../controllers/employee.controller";


const employeeRouter=express.Router();

const employeeRepository=new EmployeeRepository(datasource.getRepository(Employee));
const employeeService=new EmployeeService(employeeRepository)
const employeeContoller=new EmployeeController(employeeService,employeeRouter)

export default employeeRouter

