import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true, 
  }));
  app.use(bodyParser.json({ limit: '10mb' })); 
  app.enableCors({
    credentials:true,
    origin: process.env.CLIENT_URL
  })
  await app.listen(4200);
}
bootstrap();
