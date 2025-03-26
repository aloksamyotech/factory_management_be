import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from 'src/common/entities/machine.entity';
import { Maintenance } from 'src/common/entities/machineMaintainance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MachineService {
    constructor(
        @InjectRepository(Machine)
        private machineRepository: Repository<Machine>,

        @InjectRepository(Maintenance)
        private maintenanceRepository: Repository<Maintenance>,
    ) { }

    create(machine: Machine): Promise<Machine> {
        const newMachine = this.machineRepository.create(machine);
        return this.machineRepository.save(newMachine);
    }

    find(): Promise<Machine[]> {
        return this.machineRepository.find();
    }

    findOne(id: number): Promise<Machine | null> {
        return this.machineRepository.findOne({ where: { id } });
    }

    update(id: number, machine: Machine): Promise<Machine | null> {
        this.machineRepository.update(id, machine);
        return this.machineRepository.findOne({ where: { id } });
    }

    maintenance(machine: Maintenance): Promise<Maintenance> {
        const newMaintenance = this.maintenanceRepository.create(machine)
        return this.maintenanceRepository.save(newMaintenance)
    }

    findAllMaintenance(): Promise<Maintenance[]> {
        return this.maintenanceRepository.find({ relations: ['employeeId', 'machineId'] });
    }

}
