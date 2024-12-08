import { IsEmail, IsString } from "class-validator";

export class MailDto{
  @IsEmail()
  @IsString()
  email: string;

}