import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomIDGenerator } from 'src/common/common/IdGen';
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

  async create(createRawMaterialDto: CreateRawMaterialDto){
    const rawMaterial = this.rawMaterialRepository.create(createRawMaterialDto);
    let findId:any;
    let generatedID:string;
    do {
        generatedID = randomIDGenerator("RM",6);
        findId = await this.rawMaterialRepository.findOne({where:{id:generatedID}});
    }while(findId);
    rawMaterial.id = generatedID;
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

  async findOne(id: string): Promise<RawMaterial | null> {
    const data = this.rawMaterialRepository.findOne({ where: { id } });
    return data
  }

  async update(
    id: string,
    updateRawMaterialDto: UpdateRawMaterialDto,
  ) {
    await this.rawMaterialRepository.update(id, updateRawMaterialDto);
    const data = this.rawMaterialRepository.findOne({ where: { id } });
    return data
  }

  remove(id: string) {
    this.rawMaterialRepository.delete(id);
  }
}
