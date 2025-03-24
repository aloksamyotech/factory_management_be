import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Machine } from './machine.entity';
import { Employee } from './employee.entity';

@Entity('maintenance')
export class Maintenance {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Machine, (table) => table.maintenanceRecords)
    machineId: Machine;

    @ManyToOne(() => Employee)
    employeeId: Employee;

    @Column()
    comment: string;

    @Column()
    nextMaintenance: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
