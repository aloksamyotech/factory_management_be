import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('inventory')
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Product)
    productId: Product

    @Column()
    quantity: number

    @Column()
    type: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
