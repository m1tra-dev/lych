import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/decorators/auth.decorators';
import { AdminGuard } from 'src/decorators/admin.guard';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [JwtModule.register({ })],
  controllers: [OrderController],
  providers: [OrderService, PrismaService,JwtAuthGuard,AdminGuard,AuthService],
})
export class OrderModule {}
