import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsInt, IsDateString, IsString, IsEmpty, IsArray, ValidateNested } from 'class-validator';
export class RawMaterialItem {
  @IsOptional()
  rawMaterialId?: number;
  @IsOptional()
  quantity?: number;
}
export class CreateProductionDto {
  @IsOptional()
  @IsInt()
  machine?: number;

  @IsNotEmpty()
  @IsInt()
  product: number;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  estimationTime: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RawMaterialItem)
  items?: RawMaterialItem[];
}
