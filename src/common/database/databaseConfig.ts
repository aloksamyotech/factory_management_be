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
dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'Demo',
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
  ],
  synchronize: true,
};
