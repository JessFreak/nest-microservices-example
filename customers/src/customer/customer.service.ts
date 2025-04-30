import { Injectable } from '@nestjs/common';
import { Customer } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async getCustomer(customerId: string): Promise<Customer> {
    return await this.customerRepository.findOne({
      where: { id: customerId },
    });
  }

  async createCustomer(data: { name: string; email: string; phone: string }): Promise<Customer> {
    const newCustomer = this.customerRepository.create(data);
    return await this.customerRepository.save(newCustomer);
  }
}