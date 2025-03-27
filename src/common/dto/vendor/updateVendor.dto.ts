import {
  IsString,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class UpdateVendorDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
