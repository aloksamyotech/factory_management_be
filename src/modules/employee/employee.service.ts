import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/common/entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  create(employee: Employee): Promise<Employee> {
    const newEmployee = this.employeeRepository.create(employee);
    return this.employeeRepository.save(newEmployee);
  }

  find(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  findOne(id: number): Promise<Employee | null> {
    return this.employeeRepository.findOne({ where: { id } });
  }

  update(id: number, employee: Employee): Promise<Employee | null> {
    this.employeeRepository.update(id, employee);
    return this.employeeRepository.findOne({ where: { id } });
  }
}
