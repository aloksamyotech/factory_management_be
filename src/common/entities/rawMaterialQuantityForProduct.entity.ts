import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { RawMaterial } from './rawMaterial.entity';

@Entity('rawMaterialQuantityForProduct')
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Product)
    productId: Product;

    @ManyToOne(() => RawMaterial)
    rawmaterialId: RawMaterial;

    @Column()
    quantity: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
