import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRawMaterialDto } from 'src/common/dto/rawMaterial/createRaw.dto';
import { UpdateRawMaterialDto } from 'src/common/dto/rawMaterial/updateRaw.dto';
import { Inventory } from 'src/common/entities/inventory.entity';
import { RawMaterial } from 'src/common/entities/rawMaterial.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RawMaterialService {
  constructor(
    @InjectRepository(RawMaterial)
    private rawMaterialRepository: Repository<RawMaterial>,

    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) { }

  async create(
    createRawMaterialDto: CreateRawMaterialDto,
  ) {
    const rawMaterial = this.rawMaterialRepository.create(createRawMaterialDto);
    const saveMaterial = await this.rawMaterialRepository.save(rawMaterial);

    const inventoryItem = this.inventoryRepository.create({
      rawMaterialId: saveMaterial,
      type: 'rawMaterial',
    });

    await this.inventoryRepository.save(inventoryItem);
    return saveMaterial;
  }

  async findAll(page: number, limit: number) {
    const data = await this.rawMaterialRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC'
      }
    })
    return data
  }

  async getAll() {
    const data = await this.rawMaterialRepository.find()
    return data
  }

  async findOne(id: number): Promise<RawMaterial | null> {
    const data = this.rawMaterialRepository.findOne({ where: { id } });
    return data
  }

  async update(
    id: number,
    updateRawMaterialDto: UpdateRawMaterialDto,
  ) {
    await this.rawMaterialRepository.update(id, updateRawMaterialDto);
    const data = this.rawMaterialRepository.findOne({ where: { id } });
    return data
  }

  remove(id: number) {
    this.rawMaterialRepository.delete(id);
  }
}
