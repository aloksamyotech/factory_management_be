import { IsEmail, IsString, Length } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateUserDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    phoneNumber: string;
}
