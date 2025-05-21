import {  IsNotEmpty,  IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  line1: string;

  @IsNotEmpty()
  @IsString()
  pincode: string;


}