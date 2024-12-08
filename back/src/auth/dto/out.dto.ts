import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator"
export class LogOutDto{
    @IsNumber()
        id:number
    
}