import { Type } from 'class-transformer';
import {
  IsInt,
  IsArray,
  IsDateString,
  IsInstance,
  ValidateNested,
  IsString,
} from 'class-validator';

class ProductDto {
  @IsString()
  productId: string;

  @IsInt()
  quantity: number;
}

export class CreatePurchaseDto {
  @IsString()
  vendorId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  productId: ProductDto[];

  @IsInt()
  totalAmount: number;

  @IsDateString()
  expectedDeliveryDate: Date;
}
