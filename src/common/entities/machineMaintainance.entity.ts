import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Machine } from './machine.entity';
import { Employee } from './employee.entity';

@Entity('maintenance')
export class Maintenance {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn({ type: 'varchar', length: 20, unique: true })
  id: string;

  @ManyToOne(() => Machine)
  @JoinColumn({ name: 'machineId' })
  machineId: Machine;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employeeId' })
  employeeId: Employee;

  @Column({ type: 'varchar' })
  comment: string;

  @Column({ nullable: true })
  nextMaintenance: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
