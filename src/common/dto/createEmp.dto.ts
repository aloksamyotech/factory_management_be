import {
  IsString,
  IsEmail,
  IsOptional,
  IsInt,
  IsPositive,
  IsDate,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsInt()
  id: number;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  salary: number;

  @IsString()
  department: string;

  @IsDate()
  dateOfJoining: Date;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
