import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { RawMaterial } from './rawMaterial.entity';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, { nullable: true })
  productId: Product;

  @ManyToOne(() => RawMaterial, { nullable: true })
  rawMaterialId: RawMaterial;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({
    type: 'enum',
    enum: ['kg', 'ltr', 'pieces'],
    default: 'pieces',
  })
  unit: string;

  @Column({ type: 'varchar' })
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
