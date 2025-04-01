import { Module } from '@nestjs/common';
import { RawMaterialService } from './rawmaterial.service';
import { RawMaterialController } from './rawmaterial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterial } from 'src/common/entities/rawMaterial.entity';
import { Inventory } from 'src/common/entities/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterial, Inventory])],
  providers: [RawMaterialService],
  controllers: [RawMaterialController],
})
export class RawmaterialModule {}
