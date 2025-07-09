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

  findOne(id: number): Promise<RawMaterial | null> {
    return this.rawMaterialRepository.findOne({ where: { id } });
  }

  update(
    id: number,
    updateRawMaterialDto: UpdateRawMaterialDto,
  ): Promise<RawMaterial | null> {
    this.rawMaterialRepository.update(id, updateRawMaterialDto);
    return this.rawMaterialRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    this.rawMaterialRepository.delete(id);
  }
}
