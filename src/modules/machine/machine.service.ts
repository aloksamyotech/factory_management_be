import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomIDGenerator } from 'src/common/common/IdGen';
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
        let findId:any;
        let generatedID:string;
        do {
          generatedID = randomIDGenerator("MAC",6);
          findId = await this.machineRepository.findOne({where:{id:generatedID}});
        }while(findId);
        newMachine.id = generatedID;
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

  async findOne(id: string) {
    const data = await this.machineRepository.findOne({ where: { id } });
    return data
  }

  async update(id: string, machine: UpdateMachineDto) {
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
    let findId:any;
    let generatedID:string;
    do {
      generatedID = randomIDGenerator("MM",6);
      findId = await this.machineRepository.findOne({where:{id:generatedID}});
    }while(findId);
    const newMaintenance = this.maintenanceRepository.create({
      id: generatedID,
      employeeId: employee,
      machineId: machine,
      comment: createMaintenanceDto.comment,
      nextMaintenance: createMaintenanceDto.nextMaintenance,
    });
    const data = await this.maintenanceRepository.save(newMaintenance);
    return data
  }

  async findAllMaintenance(page: number, limit: number, machineId: any) {
    const data = await this.maintenanceRepository.findAndCount({
      where: {
        machineId: {
          id: machineId
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC'
      },
      relations: ['employeeId', 'machineId'],
    });
    return data
  }

  async findMaintenanceById(id: string) {
    const data = await this.maintenanceRepository.findOne({
      relations: ['employeeId', 'machineId'],
      where: { id },
    });
    return data
  }

  async updateMaintenance(id: string, maintenance: Maintenance) {
    await this.maintenanceRepository.update(id, maintenance);
    const data = await this.maintenanceRepository.findOne({ where: { id } });
    return data
  }
}
