import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/common/entities/order.entity';
import { OrderItems } from 'src/common/entities/orderItems.entity';
import { Product } from 'src/common/entities/product.entity';
import { Customer } from 'src/common/entities/customer.entity';
import { Inventory } from 'src/common/entities/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItems, Product, Customer, Inventory])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
