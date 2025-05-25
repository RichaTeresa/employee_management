import EmployeeService from "../services/employee.service";
import EmployeeRepository from "../repositories/employee.repository";
import { Request, Response, Router, NextFunction } from "express";
import HttpException from "../exception/httpException";
import { isEmail } from "../validators/emailValidator";
import { CreateEmployeeDto } from "../dto/createEmployee.dto";
import { CreateAddressDto } from "../dto/createAddress.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateEmployeeDto } from "../dto/updateEmployee.dto";
import {  checkRole } from "../middlewares/authorization.middleware";
import { EmployeeRole } from "../entities/employee.entity";
import { DepartmentRepository } from "../repositories/department.repository";
import Department from "../entities/department.entity";

class EmployeeController {

  
  constructor(private employeeService: EmployeeService, router: Router) {


    const authRoles=[EmployeeRole.HR,EmployeeRole.DEVELOPER,EmployeeRole.UI,EmployeeRole.UX]
    router.post("/",checkRole(authRoles),this.createEmployee.bind(this));
    router.get("/", this.getAllEmployees.bind(this));
    router.get("/:id", this.getEmployeeById.bind(this));
    router.put("/:id",checkRole(authRoles), this.updateEmployee);
    router.delete("/:id",checkRole(authRoles), this.deleteEmployee);
  }

  async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedEmployee = await this.employeeService.createEmployee(
        createEmployeeDto.employeeId,
        createEmployeeDto.dateOfJoining,
        createEmployeeDto.status,
        createEmployeeDto.experience,
        createEmployeeDto.name,
        createEmployeeDto.email,
        createEmployeeDto.age,
        createEmployeeDto.role,
        createEmployeeDto.address,
        createEmployeeDto.password,
        createEmployeeDto.deptId
      );
      res.status(201).send(savedEmployee);
    } catch (error) {
      next(error);
    }
  }

  async getAllEmployees(req: Request, res: Response) {
    const employees = await this.employeeService.getAllEmployees();
    res.status(200).send(employees);
  }

  async getEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const employee = await this.employeeService.getEmployeeById(id);
      if (!employee) {
        throw new HttpException(404, "");
      }
      res.status(200).send(employee);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new HttpException(400, "Invalid employee ID");
      }
      const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
      console.log("updated")
      const errors = await validate(updateEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, errors as unknown as string);
      }
      const updatedEmployee = await this.employeeService.updateEmployee(
        id,
        updateEmployeeDto.employeeId,
        updateEmployeeDto.dateOfJoining,
        updateEmployeeDto.status,
        updateEmployeeDto.experience,
        updateEmployeeDto.name,
        updateEmployeeDto.email,
        updateEmployeeDto.age,
        updateEmployeeDto.address,
        updateEmployeeDto.password,
        updateEmployeeDto.deptId
      );

      res.status(200).send(updatedEmployee);
    } catch (error) {
      next(error);
    }
  };

  deleteEmployee = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.employeeService.deleteEmployee(id);
    res.status(200).send();
  };
}

function fn1() {
  console.log("hiii");
}

export default EmployeeController;
