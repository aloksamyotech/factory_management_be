import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMachineDto } from 'src/common/dto/machine/createmachine.dto';
import { UpdateMachineDto } from 'src/common/dto/machine/updateMachine.dto';
import { CreateMaintenanceDto } from 'src/common/dto/maintenance/createMaintenance.dto';
import { Production } from 'src/common/entities/production.entity';
import { Machine } from 'src/common/entities/machine.entity';
import { Maintenance } from 'src/common/entities/machineMaintainance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductionService {
    constructor(
        @InjectRepository(Production)
        private productionRepository: Repository<Production>,
    ) { }

    async create(production: any) {
        const newProd = this.productionRepository.create(production);
        const data = await this.productionRepository.save(newProd);
        return data
    }

    async find(page: number, limit: number) {
        const data = await this.productionRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC'
            }
        });
        return data
    }

    async findOne(id: number) {
        const data = await this.productionRepository.findOne({ where: { id } });
        return data
    }

    // async update(id: number, production: any) {
    //     await this.productionRepository.update(id, production);
    //     return
    // }

}
