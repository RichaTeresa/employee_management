import { mock, MockProxy } from "jest-mock-extended";
import EmployeeService from "../../services/employee.service";
import EmployeeRepository from "../../repositories/employee.repository";
import { when } from "jest-when";
import Employee from "../../entities/employee.entity";
import HttpException from "../../exception/httpException";

describe("EmployeeService", () => {
  let employeeRepository: MockProxy<EmployeeRepository>;
  let employeeService: EmployeeService;

  beforeEach(() => {
    employeeRepository = mock<EmployeeRepository>();
    employeeService = new EmployeeService(employeeRepository);
  });

  describe("getEmployeeById", () => {
    const mockEmployee = {
      id: 1,
      name: "jghfhfemy",
      email: "jfehjkm@gmail.com",
      age: 22,
      role: "HR",
      address: {
        line1: "ghguyfyteet",
        pincode: "67985845",
      },
      password: "password",
    } as Employee;

    it("getEmployeeById returns an employee when proper id is given", async () => {
      when(employeeRepository.findOneById)
        .calledWith(mockEmployee.id)
        .mockReturnValue(mockEmployee);

      const result = await employeeService.getEmployeeById(1);

      expect(result).toEqual(mockEmployee);
      expect(employeeRepository.findOneById).toHaveBeenCalledWith(1);
    });

    it("returns an error if no employee is found for the id", async () => {
      when(employeeRepository.findOneById).calledWith(2).mockReturnValue(null);

      expect(employeeService.getEmployeeById(1)).rejects.toThrow(
        "Employee not found"
      );

      expect(employeeRepository.findOneById).toHaveBeenCalledWith(1);
    });
  });

   
  describe("getAllEmployees", () => {
    it("getAllEmployees should return all employees", async () => {
      const id = 1;
      when(employeeRepository.findMany)
        .calledWith()
        .mockReturnValue([{} as Employee]);
      const result = await employeeService.getAllEmployees();

      expect(result).toBeInstanceOf(Array<Employee>);
      expect(employeeRepository.findMany).toHaveBeenCalledTimes(1);
    });
  });

   describe("getEmployeeByEmail", () => {
    it("returns an employee when called with valid email", async () => {
      const email = "email@gmail.com";
      const mockEmployee = { name: "richa" } as Employee;
      when(employeeRepository.findOneByEmail)
        .calledWith(email)
        .mockReturnValue(mockEmployee);

      const result = await employeeService.getEmployeeByEmail(email);

      expect(result).toStrictEqual(mockEmployee);
      expect(employeeRepository.findOneByEmail).toHaveBeenCalledWith(email);
    });


    it(" returns an error  when called with an invalid email", async () => {
      const email = "email@gmail.com";
      const mockError=new HttpException(400,"invalid email")
      when(employeeRepository.findOneByEmail).calledWith(email).mockRejectedValue(mockError);

      expect (employeeService.getEmployeeByEmail(email)).rejects.toThrow(mockError);

      expect(employeeRepository.findOneByEmail).toHaveBeenCalledWith(email);
    });
    
  });

   describe("deleteEmployee", () => {
    it("should delete user when user with proper id exists", async () => {
      const mockEmployee = { id: 123, name: "Employee name" } as Employee;

      when(employeeRepository.findOneById)
        .calledWith(123)
        .mockReturnValue(mockEmployee);
      when(employeeRepository.delete).calledWith(123).mockReturnValue(null);

      await employeeService.deleteEmployee(mockEmployee.id);

      expect(employeeRepository.findOneById).toHaveBeenCalledWith(123);
      expect(employeeRepository.delete).toHaveBeenCalledWith({ id: 123, name: 'Employee name' });
    });

    it("should throw an error when user with provided id does not exist", async () => {
      const mockError=new HttpException(404,"Employee not found")
      when(employeeRepository.findOneById)
        .calledWith(123)
        .mockRejectedValue(mockError);
      //Act
      await expect(employeeService.deleteEmployee(123)).rejects.toThrow(mockError );

      //Assert
      expect(employeeRepository.findOneById).toHaveBeenCalledWith(123);
      expect(employeeRepository.delete).not.toHaveBeenCalled();
    });
  });


});
