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

  create(machine: CreateMachineDto): Promise<Machine> {
    const newMachine = this.machineRepository.create(machine);
    return this.machineRepository.save(newMachine);
  }

  find(): Promise<Machine[]> {
    return this.machineRepository.find();
  }

  findOne(id: number): Promise<Machine | null> {
    return this.machineRepository.findOne({ where: { id } });
  }

  update(id: number, machine: UpdateMachineDto): Promise<Machine | null> {
    this.machineRepository.update(id, machine);
    return this.machineRepository.findOne({ where: { id } });
  }

  async maintenance(createMaintenanceDto: CreateMaintenanceDto): Promise<Maintenance> {
    const machine = await this.machineRepository.findOne({ where: { id: createMaintenanceDto.machineId } });
    const employee = await this.employeeRepository.findOne({ where: { id: createMaintenanceDto.employeeId } });
    if (!employee || !machine) {
      throw new Error('not found');
    }
    const newMaintenance = this.maintenanceRepository.create(
      {
        employeeId: employee,
        machineId: machine,
        comment: createMaintenanceDto.comment,
        nextMaintenance: createMaintenanceDto.nextMaintenance
      }
    );
    return this.maintenanceRepository.save(newMaintenance);
  }

  findAllMaintenance(): Promise<Maintenance[]> {
    return this.maintenanceRepository.find({
      relations: ['employeeId', 'machineId'],
    });
  }

  findMaintenanceById(id: number): Promise<Maintenance | null> {
    return this.maintenanceRepository.findOne({
      relations: ['employeeId', 'machineId'],
      where: { id },
    });
  }

  updateMaintenance(
    id: number,
    maintenance: Maintenance,
  ): Promise<Maintenance | null> {
    this.maintenanceRepository.update(id, maintenance);
    return this.maintenanceRepository.findOne({ where: { id } });
  }
}
