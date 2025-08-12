import { IsEmail, IsNumber, IsPositive, IsString } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('employees')
export class Employee {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn({ type: 'varchar', length: 20, unique: true })
  id: string;

  @IsString()
  @Column({ type: 'varchar' })
  firstName: string;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @Column()
  password: string;
  // @IsEmail()
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', unique: true })
  phoneNumber: string;

  @IsPositive()
  @Column({ type: 'int', nullable: true })
  salary: number;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  department: string;

  @CreateDateColumn({ nullable: true })
  dateOfJoining: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
