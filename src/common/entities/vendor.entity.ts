import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('vendors')
export class Vendor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    firstName: string;

    @Column({ type: 'varchar', nullable: true })
    lastName: string;

    @Column({ type: 'varchar', nullable: true })
    email: string;

    @Column({ type: 'varchar', nullable: true })
    phoneNumber: string;

    @Column({ type: 'varchar' })
    address: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

} 