import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/common/constant/constant';
import { CreateEmployeeDto } from 'src/common/dto/employee/createEmp.dto';
import { updateEmployeeDto } from 'src/common/dto/employee/updateEmp.dto';
import { Employee } from 'src/common/entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) { }

  async create(employee: CreateEmployeeDto) {
    const mailExist = await this.employeeRepository.findOne({
      where: { email: employee.email },
    });
    if (mailExist) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.BAD_REQUEST,
          message: Message.emailAlreadyRegistered,
          timestamp: new Date().toISOString(),
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const numberExist = await this.employeeRepository.findOne({
      where: { phoneNumber: employee.phoneNumber },
    });
    if (numberExist) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.BAD_REQUEST,
          message: Message.phoneNumberAlreadyRegistered,
          timestamp: new Date().toISOString(),
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = this.employeeRepository.create(employee);
    const newEmployee = this.employeeRepository.save(data);
    return newEmployee
  }

  async find(page: number, limit: number) {
    const data = await this.employeeRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
    return data;
  }

  findOne(id: number) {
    const data = this.employeeRepository.findOne({ where: { id } });
    return data
  }

  update(id: number, employee: updateEmployeeDto) {
    const updated = this.employeeRepository.update(id, employee);
    const data = this.employeeRepository.findOne({ where: { id } });
    return data
  }
}
