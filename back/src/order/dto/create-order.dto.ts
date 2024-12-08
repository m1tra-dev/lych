import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  items: { productId: number; quantity: number }[];

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
