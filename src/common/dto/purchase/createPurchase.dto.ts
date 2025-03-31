import { Type } from 'class-transformer';
import { IsInt, IsArray, IsDateString, IsInstance, ValidateNested } from 'class-validator';

class ProductDto {
  @IsInt()
  pId: number;

  @IsInt()
  qty: number;
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
