import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMachineDto } from 'src/common/dto/machine/createmachine.dto';
import { UpdateMachineDto } from 'src/common/dto/machine/updateMachine.dto';
import { CreateMaintenanceDto } from 'src/common/dto/maintenance/createMaintenance.dto';
import { Employee } from 'src/common/entities/employee.entity';
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

    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) { }

  async create(machine: CreateMachineDto) {
    const newMachine = this.machineRepository.create(machine);
    const data = await this.machineRepository.save(newMachine);
    return data
  }

  async find(page: number, limit: number) {
    const data = await this.machineRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC'
      }
    });
    return data
  }

  async findOne(id: number) {
    const data = await this.machineRepository.findOne({ where: { id } });
    return data
  }

  async update(id: number, machine: UpdateMachineDto) {
    await this.machineRepository.update(id, machine);
    const data = await this.machineRepository.findOne({ where: { id } });
    return data
  }

  async maintenance(createMaintenanceDto: CreateMaintenanceDto) {
    const machine = await this.machineRepository.findOne({
      where: { id: createMaintenanceDto.machineId },
    });
    const employee = await this.employeeRepository.findOne({
      where: { id: createMaintenanceDto.employeeId },
    });
    if (!employee || !machine) {
      throw new Error('not found');
    }
    const newMaintenance = this.maintenanceRepository.create({
      employeeId: employee,
      machineId: machine,
      comment: createMaintenanceDto.comment,
      nextMaintenance: createMaintenanceDto.nextMaintenance,
    });
    const data = await this.maintenanceRepository.save(newMaintenance);
    return data
  }

  async findAllMaintenance() {
    const data = await this.maintenanceRepository.find({
      relations: ['employeeId', 'machineId'],
    });
    return data
  }

  async findMaintenanceById(id: number) {
    const data = await this.maintenanceRepository.findOne({
      relations: ['employeeId', 'machineId'],
      where: { id },
    });
    return data
  }

  async updateMaintenance(id: number, maintenance: Maintenance) {
    await this.maintenanceRepository.update(id, maintenance);
    const data = await this.maintenanceRepository.findOne({ where: { id } });
    return data
  }
}
