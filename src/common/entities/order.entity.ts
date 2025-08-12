import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItems } from './orderItems.entity';

@Entity('orders')
export class Order {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn({ type: 'varchar', length: 20, unique: true })
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn()
  customerId: Customer;

  @OneToMany(() => OrderItems, (items) => items.order)
  itemId: OrderItems[];

  @Column({ type: 'int' })
  totalAmount: number;

  @Column()
  expectedDeliveryDate: Date;

  @Column({ type: 'varchar', default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
