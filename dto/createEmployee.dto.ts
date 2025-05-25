import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./createAddress.dto";
import { Type } from "class-transformer";
import { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";

export class CreateEmployeeDto {
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

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsNotEmpty()
  @IsNumber()
  deptId: number;

}
