import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Machine } from 'src/common/entities/machine.entity';
import { MachineService } from './machine.service';
import { Maintenance } from 'src/common/entities/machineMaintainance.entity';
import { CreateMachineDto } from 'src/common/dto/machine/createmachine.dto';
import { UpdateMachineDto } from 'src/common/dto/machine/updateMachine.dto';
import { CreateMaintenanceDto } from 'src/common/dto/maintenance/createMaintenance.dto';

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) { }

  @Get()
  findAll(): Promise<Machine[]> {
    return this.machineService.find();
  }

  @Get('/maintenance')
  findAllMaintenance(): Promise<Maintenance[]> {
    return this.machineService.findAllMaintenance();
  } //define route before the dynamic route to prevent overwrite this route

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Machine | null> {
    return this.machineService.findOne(id);
  }

  @Get('/maintenance/:id')
  findMaintenanceById(@Param('id') id: number): Promise<Maintenance | null> {
    return this.machineService.findMaintenanceById(id);
  }

  @Post()
  create(@Body() machine: CreateMachineDto): Promise<Machine> {
    return this.machineService.create(machine);
  }

  @Post('maintenance')
  addMaintenance(@Body() createMaintenanceDto: CreateMaintenanceDto): Promise<Maintenance> {
    return this.machineService.maintenance(createMaintenanceDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() machine: UpdateMachineDto,
  ): Promise<Machine | null> {
    return this.machineService.update(id, machine);
  }

  @Put('/maintenance/:id')
  updateMaintenance(
    @Param('id') id: number,
    @Body() maintenance: Maintenance,
  ): Promise<Maintenance | null> {
    return this.machineService.updateMaintenance(id, maintenance);
  }
}
