import express from 'express'
import datasource from '../db/data-source'
import Employee from '../entities/employee.entity'
import EmployeeRepository from '../repositories/employee.repository';
import EmployeeService from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';


const authRouter=express.Router()

const repository=datasource.getRepository(Employee);
const employeeRepository=new EmployeeRepository(repository)
const employeeService=new EmployeeService(employeeRepository)
const authService=new AuthService(employeeService)
new AuthController(authService,authRouter)


export default authRouter