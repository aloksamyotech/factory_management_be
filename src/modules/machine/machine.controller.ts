import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Machine } from 'src/common/entities/machine.entity';
import { MachineService } from './machine.service';
import { Maintenance } from 'src/common/entities/machineMaintainance.entity';

@Controller('machine')
export class MachineController {
    constructor(private readonly machineService: MachineService) { }

    @Post()
    create(@Body() machine: Machine): Promise<Machine> {
        return this.machineService.create(machine);
    }

    @Get('/getallmaintenance')
    findAllMaintenance(): Promise<Maintenance[]> {
        return this.machineService.findAllMaintenance();
    }

    @Get()
    findAll(): Promise<Machine[]> {
        return this.machineService.find();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Machine | null> {
        return this.machineService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() machine: Machine,
    ): Promise<Machine | null> {
        return this.machineService.update(id, machine);
    }

    @Post('maintenance')
    addMaintenance(@Body() maintenance: Maintenance): Promise<Maintenance> {
        return this.machineService.maintenance(maintenance)
    }

}
