import {Res, Body, Controller,Post, UsePipes, ValidationPipe, Req, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

import { RefreshTokenDto } from './dto/refresh.dto';
// import { Auth } from './decorators/auth.decorators';
import { LogOutDto } from './dto/out.dto';
import { LogDto } from './dto/log.dto';
import { validate } from 'class-validator';
import { MailDto } from './dto/mail.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Get('/activate/:link')
  async active(@Param('link') link: string, @Res() res){
    await this.authService.activate(link)
    return res.redirect(process.env.CLIENT_URL)
  }
  
  @UsePipes(new ValidationPipe())
  @Post('send')
  async sendMail(@Body() dto: MailDto ){
   return this.authService.mailHelper(dto)
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() dto: LogDto, @Res() res){
    return this.authService.login(dto,res)
  }
  @Get('logout')
  async logout(@Res() res){
    return this.authService.logout(res)
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto, @Res() res){
    
    return this.authService.register(dto,res)
  }

  @UsePipes(new ValidationPipe())
  @Get('access')
  async getNewTokens(@Req() req){
    return this.authService.getNewTokens(req)
  }
  }
