import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('orderItems')
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  productId: Product;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  price: number;
}
