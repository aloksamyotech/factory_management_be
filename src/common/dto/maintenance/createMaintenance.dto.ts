import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsInt,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class CreateMaintenanceDto {
  @IsInt()
  @IsNotEmpty()
  machineId: number;

  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @IsString()
  comment: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  nextMaintenance: Date;
}
