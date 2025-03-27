import { IsInt, IsArray, IsDateString, IsInstance } from 'class-validator';
import { RawMaterial } from 'src/common/entities/rawMaterial.entity';

export class CreatePurchaseDto {
  @IsInt()
  vendorId: number;

  @IsArray()
  @IsInt({ each: true })
  productId: number[];

  @IsInt()
  totalAmount: number;

  @IsDateString()
  expectedDeliveryDate: Date;
}
