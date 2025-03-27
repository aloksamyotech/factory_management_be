import {
  IsOptional,
  IsInt,
  IsArray,
  IsString,
  IsDateString,
  IsEnum,
} from 'class-validator';

export class UpdatePurchaseDto {
  @IsOptional()
  @IsInt()
  vendorId: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  productId: number[];

  @IsOptional()
  @IsInt()
  totalAmount: number;

  @IsOptional()
  @IsDateString()
  expectedDeliveryDate: Date;
}
