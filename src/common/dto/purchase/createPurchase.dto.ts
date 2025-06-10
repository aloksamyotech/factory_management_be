import { Type } from 'class-transformer';
import {
  IsInt,
  IsArray,
  IsDateString,
  IsInstance,
  ValidateNested,
} from 'class-validator';

class ProductDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}

export class CreatePurchaseDto {
  @IsInt()
  vendorId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  productId: ProductDto[];

  @IsInt()
  totalAmount: number;

  @IsDateString()
  expectedDeliveryDate: Date;
}
