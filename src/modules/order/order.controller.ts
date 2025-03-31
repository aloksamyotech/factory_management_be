import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from 'src/common/dto/order/createOrder.dto';
import { Order } from 'src/common/entities/order.entity';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto);
    }

    @Get()
    findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Order | null> {
        return this.orderService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.orderService.remove(id);
    }
}
