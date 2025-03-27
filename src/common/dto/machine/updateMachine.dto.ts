import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateMachineDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}
