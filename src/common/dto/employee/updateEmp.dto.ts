import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsInt,
  IsPositive,
  IsDate,
} from 'class-validator';

export class updateEmployeeDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  salary: number;

  @IsString()
  @IsOptional()
  department: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  dateOfJoining: Date;
}
