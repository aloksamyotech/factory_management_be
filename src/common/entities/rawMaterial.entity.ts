import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('rawMaterials')
export class RawMaterial {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn({ type: 'varchar', length: 20, unique: true })
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  unit: string;

  @Column({ type: 'int' })
  price: number;

  @ManyToMany(() => Product)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
