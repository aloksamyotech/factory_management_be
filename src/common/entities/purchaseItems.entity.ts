import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { RawMaterial } from './rawMaterial.entity';
import { Purchase } from './purchase.entity';

@Entity('purchaseItems')
export class PurchaseItems {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Purchase, (purchase) => purchase.itemId)
    purchase: Purchase

    @ManyToOne(() => RawMaterial)
    rawMaterial: RawMaterial;

    @Column({ type: 'int' })
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
