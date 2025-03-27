import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => RawMaterial, {
    cascade: true,
  })
  @JoinTable()
  productId: RawMaterial[];

  @ManyToOne(() => Vendor)
  @JoinColumn({ name: 'vendorId' })
  vendorId: Vendor;

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
