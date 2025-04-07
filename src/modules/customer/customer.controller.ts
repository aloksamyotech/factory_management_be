import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Customer } from 'src/common/entities/customer.entity';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from 'src/common/dto/customer/createCustomer.dto';
import { UpdateCustomerDto } from 'src/common/dto/customer/updateCustomer.dto';
import { CheckToken } from 'src/common/guard/checkToken.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post()
  create(@Body() customer: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(customer);
  }

  @Get()
  // @UseGuards(new CheckToken())
  findAll(@Query('page') page: number=1, @Query('limit') limit: number=10) {
    return this.customerService.find(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Customer | null> {
    return this.customerService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() customer: UpdateCustomerDto,
  ): Promise<Customer | null> {
    return this.customerService.update(id, customer);
  }
}
