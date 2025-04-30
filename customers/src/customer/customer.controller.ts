import { Body, Controller, Post } from '@nestjs/common';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';

const GET_CUSTOMER = 'getCustomer';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService
  ) {}

  @MessagePattern(GET_CUSTOMER)
  async handleGetCustomer(@Payload() data: { customerId: string }) {
    console.log('Search customer with id:', data.customerId);
    const { customerId } = data;
    return await this.customerService.getCustomer(customerId);
  }

  @Post()
  async createCustomer(@Body() data: { name: string; email: string; phone: string }): Promise<Customer> {
    return await this.customerService.createCustomer(data);
  }
}