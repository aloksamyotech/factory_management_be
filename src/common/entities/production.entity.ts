import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Machine } from './machine.entity';
import { Product } from './product.entity';

@Entity('production')
export class Production {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn({ type: 'varchar', length: 20, unique: true })
  id: string;

  @ManyToOne(() => Machine, { nullable: true })
  machine: Machine | null;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;

  @Column()
  estimationTime: string;

  @Column({default:'pending'})
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
