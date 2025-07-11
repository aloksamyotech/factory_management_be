import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Machine } from './machine.entity';
import { Product } from './product.entity';
import { Employee } from './employee.entity';

@Entity('production')
export class Production {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Machine,{nullable:true})
  machine: Machine;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;

  @Column()
  estimationTime: Date;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
