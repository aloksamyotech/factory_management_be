import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Repository } from 'typeorm';
import { Purchase } from 'src/common/entities/purchase.entity';
import { CreatePurchaseDto } from 'src/common/dto/purchase/createPurchase.dto';
import { RawMaterial } from 'src/common/entities/rawMaterial.entity';
import { Vendor } from 'src/common/entities/vendor.entity';
import { UpdatePurchaseDto } from 'src/common/dto/purchase/updatePurchase.dto';
import { PurchaseItems } from 'src/common/entities/purchaseItems.entity';
import { Order } from 'src/common/entities/order.entity';
import { CreateOrderDto } from 'src/common/dto/order/createOrder.dto';
import { Customer } from 'src/common/entities/customer.entity';
import { Product } from 'src/common/entities/product.entity';
import { OrderItems } from 'src/common/entities/orderItems.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(OrderItems)
    private orderItemQtyRepository: Repository<OrderItems>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, productId, totalAmount, expectedDeliveryDate } =
      createOrderDto;

    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    const order = this.orderRepository.create({
      customerId: customer,
      totalAmount,
      expectedDeliveryDate,
    });
    const saveOrder = await this.orderRepository.save(order);

    productId.map(async (item) => {
      const product = await this.productRepository.findOne({
        where: { id: item.pId },
      });
      if (!product) {
        return new Error('item not found');
      }
      const newOrder = this.orderItemQtyRepository.create({
        order: saveOrder,
        productId: product,
        quantity: item.qty,
      });
      const saved = await this.orderItemQtyRepository.save(newOrder);
      return saved;
    });
    return saveOrder;
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['itemId', 'customerId'],
    });
  }

  findOne(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['itemId', 'customerId'],
    });
  }

  remove(id: number) {
    this.orderRepository.delete(id);
  }
}
