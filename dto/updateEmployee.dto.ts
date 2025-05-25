import { IsEmail,IsEnum, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./createAddress.dto";
import { Type } from "class-transformer";
import { CreateEmployeeDto } from "./createEmployee.dto";
import { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";
import { UpdateAddressDto } from "./updateAddress.dto";

export class UpdateEmployeeDto {

  @IsNotEmpty()
    @IsString()
    employeeId:string
  
    @IsNotEmpty()
    @IsString()
    dateOfJoining:Date
  
    @IsNotEmpty()
    @IsNumber()
    experience:number
  
    @IsNotEmpty()
    @IsEnum(EmployeeStatus)
    status:EmployeeStatus
    
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password:string;

  @IsNotEmpty()
  @IsEnum(EmployeeRole)
  role:EmployeeRole;
  
  @IsNotEmpty()
  @IsNumber()
  deptId: number;

  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: UpdateAddressDto;
}