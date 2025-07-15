import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { CreateCustomerDto } from 'src/common/dto/customer/createCustomer.dto';
import { UpdateCustomerDto } from 'src/common/dto/customer/updateCustomer.dto';
import { Customer } from 'src/common/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) { }

  async create(customer: CreateCustomerDto) {
    const data = this.customerRepository.create(customer);
    const newCustomer = await this.customerRepository.save(data)
    return newCustomer;
  }

  async find(page: number, limit: number) {
    const data = await this.customerRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC'
      }
    });
    return data
  }

  async findOne(id: number) {
    const data = await this.customerRepository.findOne({ where: { id } });
    return data
  }

  async update(id: number, customer: UpdateCustomerDto) {
    await this.customerRepository.update(id, customer);
    const data = await this.customerRepository.findOne({ where: { id } });
    return data
  }
}
