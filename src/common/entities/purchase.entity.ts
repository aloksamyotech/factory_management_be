import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vendor } from './vendor.entity';
import { PurchaseItems } from './purchaseItems.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor)
  @JoinColumn()
  vendorId: Vendor;

  @OneToMany(() => PurchaseItems, (item) => item.purchase)
  itemId: PurchaseItems[];

  @Column({ type: 'int' })
  totalAmount: number;

  @Column({ type: 'varchar', default: 'pending' })
  status: string;

  @Column()
  expectedDeliveryDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
