import { User } from '../entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
import { Employee } from '../entities/employee.entity';
import { Customer } from '../entities/customer.entity';
import { Machine } from '../entities/machine.entity';
import { Maintenance } from '../entities/machineMaintainance.entity';
import { Product } from '../entities/product.entity';
import { Vendor } from '../entities/vendor.entity';
import { RawMaterial } from '../entities/rawMaterial.entity';
import { Purchase } from '../entities/purchase.entity';
import { Inventory } from '../entities/inventory.entity';
import { PurchaseItems } from '../entities/purchaseItems.entity';
import { Order } from '../entities/order.entity';
import { OrderItems } from '../entities/orderItems.entity';
dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'FMS',
  entities: [
    User,
    Employee,
    Customer,
    Machine,
    Maintenance,
    Product,
    Vendor,
    RawMaterial,
    Purchase,
    Inventory,
    PurchaseItems,
    Order,
    OrderItems
  ],
  synchronize: true,
};
