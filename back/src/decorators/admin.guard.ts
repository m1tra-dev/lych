// admin.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './auth.decorators';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
@Injectable()
export class AdminGuard extends JwtAuthGuard implements CanActivate {
 constructor(private readonly jwtService: JwtService) {
     super();
 }
 async canActivate(context: ExecutionContext): Promise<boolean> {
   const request = context.switchToHttp().getRequest();
   const cookie = request.cookies.refreshToken;
 
   if (!cookie) {
     throw new ForbiddenException('Refresh token is missing');
   }
 
   try {

     const payload = await this.jwtService.verifyAsync(
         cookie,
         {secret: process.env.JWT_SECRET}
       );
     if (!payload.adm) {
       throw new ForbiddenException('Access denied. Admins only.');
     }
 
     return true;
   } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new ForbiddenException('Invalid token');
    }
    throw new ForbiddenException('Access denied. Admins only.');
   }
 }
}
