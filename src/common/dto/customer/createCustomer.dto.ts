import { IsString, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}
