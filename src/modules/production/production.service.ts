import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMachineDto } from 'src/common/dto/machine/createmachine.dto';
import { UpdateMachineDto } from 'src/common/dto/machine/updateMachine.dto';
import { CreateMaintenanceDto } from 'src/common/dto/maintenance/createMaintenance.dto';
import { Production } from 'src/common/entities/production.entity';
import { Machine } from 'src/common/entities/machine.entity';
import { Maintenance } from 'src/common/entities/machineMaintainance.entity';
import { Repository } from 'typeorm';
import { CreateProductionDto } from 'src/common/dto/production/createProduction.dto';
import { Product } from 'src/common/entities/product.entity';
import { UpdateStatusDto } from 'src/common/dto/production/updateStatus.dto';

@Injectable()
export class ProductionService {
    constructor(
        @InjectRepository(Production)
        private productionRepository: Repository<Production>,
        @InjectRepository(Machine)
        private machineRepository: Repository<Machine>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async create(production: CreateProductionDto) {

        const { machine, product, quantity, estimationTime, status } = production;

        const machineData = machine ? await this.machineRepository.findOne({
            where: { id: machine },
        }) : null;

        const productData = await this.productRepository.findOne({
            where: { id: product },
        });
        if (!productData) {
            throw new Error('Product not found');
        }

        const productionNew = this.productionRepository.create({
            product: productData,
            machine: machineData,
            quantity,
            estimationTime,
            status
        });
        const saveData = await this.productionRepository.save(productionNew);
        return saveData
    }

    async find(page: number, limit: number) {
        const data = await this.productionRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC'
            },
            relations: ['product', 'machine'],
        });
        return data
    }

    async findOne(id: number) {
        const data = await this.productionRepository.findOne({ where: { id } });
        return data
    }

    async updateStatus(id: number, dto: {status: string}){
        await this.productionRepository.update(id, {status: dto.status});
        return this.findOne(id);
    }
    // async update(id: number, production: any) {
    //     await this.productionRepository.update(id, production);
    //     return
    // }

}
