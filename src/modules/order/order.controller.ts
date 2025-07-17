import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  Patch,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from 'src/common/dto/order/createOrder.dto';
import { Order } from 'src/common/entities/order.entity';
import { UpdateStatusDto } from 'src/common/dto/production/updateStatus.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('customerId') customerId: any) {
    return this.orderService.findAll(page, limit, customerId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.orderService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderService.remove(id);
  }

  @Patch(':id')
    updateStatus(@Param('id') id: number, @Body() updateStatusDto: UpdateStatusDto) {
      return this.orderService.updateStatus(+id, updateStatusDto);
    }
}
