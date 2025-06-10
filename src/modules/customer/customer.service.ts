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

  create(customer: CreateCustomerDto) {
    const data = this.customerRepository.create(customer);
    const newCustomer = this.customerRepository.save(data)
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

  findOne(id: number): Promise<Customer | null> {
    return this.customerRepository.findOne({ where: { id } });
  }

  update(id: number, customer: UpdateCustomerDto): Promise<Customer | null> {
    this.customerRepository.update(id, customer);
    return this.customerRepository.findOne({ where: { id } });
  }
}
