import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Production } from 'src/common/entities/production.entity';
import { ProductionController } from './production.controller';
import { ProductionService } from './production.service';
import { Machine } from 'src/common/entities/machine.entity';
import { Product } from 'src/common/entities/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Production,Machine,Product])],
    providers: [ProductionService],
    controllers: [ProductionController],
})
export class ProductionModule { }
