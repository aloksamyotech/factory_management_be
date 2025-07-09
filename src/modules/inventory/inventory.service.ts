import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'src/common/entities/inventory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>,
    ) { }

    async findAll(page: number, limit: number) {
        const data = await this.inventoryRepository.findAndCount({
            relations: ['rawMaterialId','productId'],
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC'
            }
        })
        return data
    }
}
