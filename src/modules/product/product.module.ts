import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/common/entities/product.entity';
import { RawMaterial } from 'src/common/entities/rawMaterial.entity';
import { Inventory } from 'src/common/entities/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, RawMaterial, Inventory])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
