import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/common/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) { }

    create(customer: Customer): Promise<Customer> {
        const newCustomer = this.customerRepository.create(customer);
        return this.customerRepository.save(newCustomer);
    }

    find(): Promise<Customer[]> {
        return this.customerRepository.find();
    }

    findOne(id: number): Promise<Customer | null> {
        return this.customerRepository.findOne({ where: { id } });
    }

    update(id: number, customer: Customer): Promise<Customer | null> {
        this.customerRepository.update(id, customer);
        return this.customerRepository.findOne({ where: { id } });
    }
}
