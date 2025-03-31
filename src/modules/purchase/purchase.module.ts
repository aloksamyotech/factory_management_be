import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from 'src/common/entities/purchase.entity';
import { Vendor } from 'src/common/entities/vendor.entity';
import { RawMaterial } from 'src/common/entities/rawMaterial.entity';
import { PurchaseItems } from 'src/common/entities/purchaseItems.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Vendor, RawMaterial, PurchaseItems])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule { }