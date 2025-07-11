import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vendor } from './vendor.entity';
import { PurchaseItems } from './purchaseItems.entity';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ unique: true })
  // orderId: string;

  // @BeforeInsert()
  // generateOrderId() {
  //   this.orderId = 'ORD-' + nanoid(6).toUpperCase(); // 6-char ID like ORD-X8Z91P
  // }

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
