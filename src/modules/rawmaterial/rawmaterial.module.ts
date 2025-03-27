import { Module } from '@nestjs/common';
import { RawMaterialService } from './rawmaterial.service';
import { RawMaterialController } from './rawmaterial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterial } from 'src/common/entities/rawMaterial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterial])],
  providers: [RawMaterialService],
  controllers: [RawMaterialController],
})
export class RawmaterialModule {}
