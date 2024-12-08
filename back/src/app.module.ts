import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';





@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    CategoryModule, 
    ProductModule, 
    AuthModule,
    OrderModule,
    UserModule,

  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}