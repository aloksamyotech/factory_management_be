import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsInt,
  IsPositive,
  IsDate,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  salary?: number;

  @IsString()
  department: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  dateOfJoining: Date;
}
