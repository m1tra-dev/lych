import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/decorators/auth.decorators';
import { AdminGuard } from 'src/decorators/admin.guard';

@Module({
  imports: [JwtModule.register({ })],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService,JwtAuthGuard,AdminGuard],
})
export class CategoryModule {}
