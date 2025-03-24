import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Maintenance } from "./machineMaintainance.entity";

@Entity('machines')
export class Machine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    description: string;

    @Column({ type: 'varchar' })
    type: string;

    @Column({ type: 'boolean' })
    status: boolean;

    @OneToMany(() => Maintenance, (table) => table.machineId)
    maintenanceRecords: Maintenance[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}