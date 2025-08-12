import { HttpException,HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMachineDto } from 'src/common/dto/machine/createmachine.dto';
import { UpdateMachineDto } from 'src/common/dto/machine/updateMachine.dto';
import { CreateMaintenanceDto } from 'src/common/dto/maintenance/createMaintenance.dto';
import { Production } from 'src/common/entities/production.entity';
import { Machine } from 'src/common/entities/machine.entity';
import { Maintenance } from 'src/common/entities/machineMaintainance.entity';
import { Between, Repository } from 'typeorm';
import { CreateProductionDto } from 'src/common/dto/production/createProduction.dto';
import { Product } from 'src/common/entities/product.entity';
import { UpdateStatusDto } from 'src/common/dto/production/updateStatus.dto';
import { Inventory } from 'src/common/entities/inventory.entity';
import { RawMaterial } from 'src/common/entities/rawMaterial.entity';
import { randomIDGenerator } from 'src/common/common/IdGen';

@Injectable()
export class ProductionService {
    constructor(
        @InjectRepository(Production)
        private productionRepository: Repository<Production>,
        @InjectRepository(Machine)
        private machineRepository: Repository<Machine>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>
    ) { }

    async create(production: CreateProductionDto) {

        const { machine, product, quantity, estimationTime, status, items } = production;

        const machineData = machine ? await this.machineRepository.findOne({
            where: { id: machine },
        }) : null;

        const productData = await this.productRepository.findOne({
            where: { id: product },
        });
        if (!productData) {
            throw new Error('Product not found');
        }
        if(items){
        for(const item of items){
            const inventory = await this.inventoryRepository.findOne({ where: { rawMaterialId: {id : item.rawMaterialId} },relations:['rawMaterialId']
            });
            
            if(!inventory){
                 throw new HttpException(
                    {
                        success: false,
                        status: HttpStatus.BAD_REQUEST,
                        message: `Raw Material not found in inventory`,
                        timestamp: new Date().toISOString(),
                        data: []
                    },
                    HttpStatus.BAD_REQUEST
                )
            }
            if(item.quantity){
                inventory.quantity -= item?.quantity 
            }
            await this.inventoryRepository.save(inventory);
        }   
    }
        let findId:any;
        let generatedID:string;
        do {
            generatedID = randomIDGenerator("PRD",6);
            findId = await this.machineRepository.findOne({where:{id:generatedID}});
        }while(findId);

        const productionNew = this.productionRepository.create({
            id:generatedID,
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

    async getBetweenDate(start:string,end:string){
        const data = await this.productionRepository.findAndCount({
            where: {createdAt: Between(new Date(start), new Date(end))},
            relations: ['product','machine'],
            order:{createdAt: 'DESC'}
        });
        return data;
    }
    async findOne(id: string) {
        const data = await this.productionRepository.findOne({ where: { id } });
        return data
    }

    async updateStatus(id: string, dto: UpdateStatusDto) {
        await this.productionRepository.update(id, { status: dto.status });

        const data = await this.productionRepository.findOne({ where: { id }, relations: ['product'] });
        if (!data) {
            throw new Error('Production or product data not found');
        }

        if (dto.status === 'completed') {

            const res = await this.inventoryRepository.findOne({ where: { productId: { id: data.product.id } }, relations: ['productId'] })
            if (res) {
                res.quantity += data.quantity;
                await this.inventoryRepository.save(res);
            }
        }
        return data
    }
}
