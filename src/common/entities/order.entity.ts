import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItems } from './orderItems.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer)
  customerId: Customer;

  @ManyToOne(() => OrderItems)
  orderId: OrderItems[];

  @Column({ type: 'int' })
  totalQuantity: number;

  @Column({ type: 'int' })
  totalAmount: number;

  @Column()
  ExpectedDeliveryDate: Date;

  @Column({ type: 'varchar' })
  status: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
