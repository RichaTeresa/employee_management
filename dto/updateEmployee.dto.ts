import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./createAddress.dto";
import { Type } from "class-transformer";
import { CreateEmployeeDto } from "./createEmployee.dto";

export class UpdateEmployeeDto {
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

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}