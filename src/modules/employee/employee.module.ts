import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/common/entities/employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Image } from 'src/common/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee,Image])],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
