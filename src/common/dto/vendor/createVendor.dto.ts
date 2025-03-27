import {
  IsString,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class CreateVendorDto {
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;
}
