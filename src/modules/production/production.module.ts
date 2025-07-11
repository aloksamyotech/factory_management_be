import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Production } from 'src/common/entities/production.entity';
import { ProductionController } from './production.controller';
import { ProductionService } from './production.service';

@Module({
    imports: [TypeOrmModule.forFeature([Production])],
    providers: [ProductionService],
    controllers: [ProductionController],
})
export class ProductionModule { }
