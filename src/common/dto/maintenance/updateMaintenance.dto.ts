import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsInt, IsDate } from 'class-validator';

export class UpdateMaintenanceDto {
  @IsOptional()
  @IsInt()
  machineId: number;

  @IsOptional()
  @IsInt()
  employeeId: number;

  @IsOptional()
  @IsString()
  comment: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  nextMaintenance: Date;
}
