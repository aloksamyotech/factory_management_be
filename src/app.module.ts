import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/user/user.module';
import { databaseConfig } from './common/database/databaseConfig';
import { EmployeeModule } from './modules/employee/employee.module';
import { CustomerModule } from './modules/customer/customer.module';
import { MachineModule } from './modules/machine/machine.module';
import { ProductModule } from './modules/product/product.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { RawmaterialModule } from './modules/rawmaterial/rawmaterial.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    EmployeeModule,
    CustomerModule,
    MachineModule,
    ProductModule,
    VendorModule,
    RawmaterialModule,
    PurchaseModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
