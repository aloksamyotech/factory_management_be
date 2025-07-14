import { IsNotEmpty, IsOptional, IsInt, IsDateString, IsString, IsEmpty } from 'class-validator';

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
}
