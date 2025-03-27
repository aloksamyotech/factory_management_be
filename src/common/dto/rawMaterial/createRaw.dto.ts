import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateRawMaterialDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  unit: string;

  @IsNumber()
  price: number;
}
