import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { OrderItemStatus } from '@prisma/client';

export class UpdateOrderDto {
  @IsEnum(OrderItemStatus)
  @IsOptional()
  status?: OrderItemStatus;
}
