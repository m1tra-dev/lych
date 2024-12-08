// src/order/order.service.ts
import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService, private readonly authService: AuthService) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const { items, userId } = createOrderDto;
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error(`User with id ${userId} does not exist.`);
    }
  
    const order = await this.prisma.order.create({
      data: {
        userId,
        items: {
          create: items.map(item => ({
            quantity: item.quantity,
            productId: item.productId,
          })),
        },
      },
    });

    return order;
  }

  async getAllOrders() {
    return this.prisma.order.findMany({
      include: {
        items: true,
      },
    });
  }

  async getOrderById(id: number,request) {
    const refreshToken = request.cookies.refreshToken;
    const user = await this.authService.verifyRefreshToken(refreshToken);
    if (user.adm===true){
      return this.prisma.order.findMany({
        where: { userId: id },
        include: {
          items: true,
        },
      });
    }
    if (!user || user.id !== id) {
      throw new ForbiddenException('Доступ запрещен');
    }
    return this.prisma.order.findMany({
      where: { userId: id },
      include: {
        items: true,
      },
    });
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  async deleteOrder(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
