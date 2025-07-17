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
import { UpdateStatusDto } from 'src/common/dto/production/updateStatus.dto';
import { Inventory } from 'src/common/entities/inventory.entity';

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
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
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
        where: { id: item.productId },
      });
      if (!product) {
        return new Error('item not found');
      }
      const newOrder = this.orderItemQtyRepository.create({
        order: saveOrder,
        productId: product,
        quantity: item.quantity,
      });
      const saved = await this.orderItemQtyRepository.save(newOrder);
      return saved;
    });
    return saveOrder;
  }

  async findAll(page: number, limit: number, customerId: any) {
    const data = await this.orderRepository.findAndCount({
      where: {
        customerId: {
          id: customerId
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC'
      },
      relations: ['itemId', 'itemId.productId', 'customerId'],
    });
    return data
  }

  async findOne(id: number) {
    const data = await this.orderRepository.findOne({
      where: { id },
      relations: ['itemId', 'customerId', 'itemId.productId'],
    });
    return data
  }

  remove(id: number) {
    this.orderRepository.delete(id);
  }

  async updateStatus(id: number, dto: UpdateStatusDto) {
    await this.orderRepository.update(id, { status: dto.status });
    const data = await this.orderRepository.findOne({ where: { id }, relations: ['itemId', 'itemId.productId'] });
    if (!data) {
      throw new Error('Order not found');
    }
    if (dto.status === 'completed') {
      data.itemId.map(async (item, i) => {
        const res = await this.inventoryRepository.findOne({ where: { productId: { id: item.productId.id } }, relations: ['productId'] })
        if (res) {
          res.quantity -= item.quantity;
          await this.inventoryRepository.save(res);
        }
      }
      )
    }
    return data
  }
}
