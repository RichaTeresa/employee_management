import {mock, MockProxy } from "jest-mock-extended"
import EmployeeService from '../../services/employee.service'
import EmployeeRepository from '../../repositories/employee.repository'
import{when} from 'jest-when'
import Employee from "../../entities/employee.entity"

describe('EmployeeService',()=>{

    let employeeRepository:MockProxy<EmployeeRepository>
    let employeeService:EmployeeService;

    beforeEach(()=>{
        employeeRepository=mock<EmployeeRepository>()
        employeeService=new EmployeeService(employeeRepository)
    })


    describe('getEmployeeById',()=>{


        const mockEmployee={
            "id":1,
            "name":"jghfhfemy",
    "email":"jfehjkm@gmail.com",
    "age" : 22,
    "role" :"HR",
    "address":{
        "line1": "ghguyfyteet",
        "pincode":"67985845"
    },
    "password":"password"
        } as Employee


        it('returns an employee when proper id is given', async() => {
        

        when(employeeRepository.findOneById).calledWith(mockEmployee.id).mockReturnValue(mockEmployee)
        
        const result= await employeeService.getEmployeeById(1)

        expect (result).toEqual(mockEmployee)
        expect(employeeRepository.findOneById).toHaveBeenCalledWith(1)

        })

        it('returns an error if no employee is found for the id', async()=>{
            when(employeeRepository.findOneById).calledWith(2).mockReturnValue(null)


            expect(employeeService.getEmployeeById(1)).rejects.toThrow("Employee not found")
 
            expect(employeeRepository.findOneById).toHaveBeenCalledWith(1)
        })

    })
})