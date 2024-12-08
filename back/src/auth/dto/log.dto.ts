import { IsEmail, IsOptional, IsString, MinLength } from "class-validator"
export class LogDto{
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}