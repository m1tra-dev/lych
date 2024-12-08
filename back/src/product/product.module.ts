import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthGuard } from 'src/decorators/auth.decorators';
import { AdminGuard } from 'src/decorators/admin.guard';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [JwtModule.register({ /* ваши настройки */ })],
  controllers: [ProductController],
  providers: [ProductService,PrismaService,JwtAuthGuard,AdminGuard],
})
export class ProductModule {}
