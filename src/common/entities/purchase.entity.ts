import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vendor } from './vendor.entity';
import { RawMaterial } from './rawMaterial.entity';

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
