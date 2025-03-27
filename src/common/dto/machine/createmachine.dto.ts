import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateMachineDto {
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
