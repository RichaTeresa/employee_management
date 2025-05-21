import EmployeeService from "../services/employee.service";
import EmployeeRepository from "../repositories/employee.repository";
import {Request,Response,Router} from "express"



class EmployeeContoller{
    constructor(private employeeService:EmployeeService, router:Router){
        router.post('/',this.createEmployee.bind(this))
        router.get('/',this.getAllEmployees.bind(this))
        router.get('/:id',this.getEmployeeById.bind(this))
        router.put('/:id',this.updateEmployee)
        router.delete('/:id',this.deleteEmployee)
    }

    async createEmployee(req:Request,res:Response){
        const name=req.body.name
        const email=req.body.email
        const savedEmp=await this.employeeService.createEmployee(name,email)
        res.status(201).send(savedEmp)
    }

    async getAllEmployees(req:Request,res:Response){
        const employees=await this.employeeService.getAllEmployees();
        res.status(200).send(employees)
    }

    async getEmployeeById(req:Request,res:Response){
        const id=Number(req.params.id)
        const employee=await this.employeeService.getEmployeeById(id);
        res.status(200).send(employee)

    }

    updateEmployee=async (req:Request,res:Response)=>{
        const id=Number(req.params.id)
        const name=req.body.name
        const email=req.body.email
        await this.employeeService.updateEmployee(id,name,email);
        res.status(200).send()

    }

    deleteEmployee=async (req:Request,res:Response)=>{
        const id=Number(req.params.id)
        await this.employeeService.deleteEmployee(id)
        res.status(200).send()
    }
}

export default EmployeeContoller