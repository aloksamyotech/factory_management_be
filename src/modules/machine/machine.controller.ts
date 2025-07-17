import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
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
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.machineService.find(page, limit);
  }

  @Get('/maintenance')
  findAllMaintenance(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('machineId') machineId: any) {
    return this.machineService.findAllMaintenance(page, limit, machineId);
  } //define route before the dynamic route to prevent overwrite this route

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.machineService.findOne(id);
  }

  @Get('/maintenance/:id')
  findMaintenanceById(@Param('id') id: number) {
    return this.machineService.findMaintenanceById(id);
  }

  @Post()
  create(@Body() machine: CreateMachineDto) {
    return this.machineService.create(machine);
  }

  @Post('maintenance')
  addMaintenance(
    @Body() createMaintenanceDto: CreateMaintenanceDto,
  ) {
    return this.machineService.maintenance(createMaintenanceDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() machine: UpdateMachineDto,
  ) {
    return this.machineService.update(id, machine);
  }

  @Put('/maintenance/:id')
  updateMaintenance(
    @Param('id') id: number,
    @Body() maintenance: Maintenance,
  ) {
    return this.machineService.updateMaintenance(id, maintenance);
  }
}
