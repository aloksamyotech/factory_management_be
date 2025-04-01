import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineController } from './machine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from 'src/common/entities/machine.entity';
import { Maintenance } from 'src/common/entities/machineMaintainance.entity';
import { Employee } from 'src/common/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Machine, Maintenance, Employee])],
  providers: [MachineService],
  controllers: [MachineController],
})
export class MachineModule {}
