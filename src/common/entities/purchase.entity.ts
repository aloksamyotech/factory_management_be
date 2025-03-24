import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";
import { Vendor } from "./vendor.entity";
import { RawMaterial } from "./rawMaterial.entity";

@Entity('purchases')
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => RawMaterial)
    productId: RawMaterial[];

    @ManyToOne(() => Vendor)
    vendorId: Vendor;

    @Column({ type: 'int' })
    totalAmount: number;

    @Column({ type: 'boolean' })
    status: boolean;

    @Column()
    expectedDeliveryDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}