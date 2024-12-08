import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from './jwt.stategy';
import * as CookieParser from 'cookie-parser' 
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  controllers: [AuthController],
  providers: [AuthService,PrismaService,JwtStrategy],
  imports:[
    MailerModule,
    ConfigModule,
    CookieParser,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:getJwtConfig
    },),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) ,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
  ],
})
export class AuthModule {}
