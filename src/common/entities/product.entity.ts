import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { RawMaterial } from './rawMaterial.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  category: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @ManyToMany(() => RawMaterial, { nullable: true })
  @JoinTable()
  rawMaterial: RawMaterial[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
