import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsInt, IsDateString, IsString, IsEmpty, IsArray, ValidateNested } from 'class-validator';
export class RawMaterialItem {
  @IsOptional()
  rawMaterialId?: string;
  @IsOptional()
  quantity?: number;
}
export class CreateProductionDto {
  @IsOptional()
  @IsString()
  machine?: string;

  @IsNotEmpty()
  @IsString()
  product: string;

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
