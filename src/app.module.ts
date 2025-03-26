import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/user/user.module';
import { databaseConfig } from './common/database/databaseConfig';
import { EmployeeModule } from './modules/employee/employee.module';
import { CustomerModule } from './modules/customer/customer.module';
import { MachineModule } from './modules/machine/machine.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    EmployeeModule,
    CustomerModule,
    MachineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
