import { IsEmail, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ type: 'varchar' })
  firstName: string;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @IsEmail()
  @Column({ type: 'varchar', nullable: true })
  email: string;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
