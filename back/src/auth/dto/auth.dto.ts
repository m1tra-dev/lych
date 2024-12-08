import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
export class AuthDto{
    @IsNotEmpty({
      message: 'Введите имя',
    })
    @MinLength(3, {
      message: 'Имя должно содержать 3 и более символов',
    })
    name: string;
  
    @IsString()
    @MinLength(6, {
      message: 'Пароль должен содержать 6 и более символов',
    })
    password: string;
  
    @IsEmail({}, { message: 'Некорректный email' })
    @IsString()
    email: string;
    
  }