import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class CreateMaintenanceDto {
  @IsString()
  @IsNotEmpty()
  machineId: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  comment: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  nextMaintenance: Date;
}
