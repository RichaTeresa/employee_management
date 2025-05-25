import {  IsNotEmpty,  IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateAddressDto {
  
  @IsNotEmpty()
  @IsString()
  houseNo: string;

  @IsNotEmpty()
  @IsString()
  line1: string;

  @IsString()
  line2: string;


  @IsNotEmpty()
  @IsString()
  pincode: string;

 
}