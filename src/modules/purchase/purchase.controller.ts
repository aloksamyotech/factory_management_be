import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from 'src/common/entities/purchase.entity';
import { UpdatePurchaseDto } from 'src/common/dto/purchase/updatePurchase.dto';
import { CreatePurchaseDto } from 'src/common/dto/purchase/createPurchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }

  @Get()
  findAll(): Promise<Purchase[]> {
    return this.purchaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Purchase | null> {
    return this.purchaseService.findOne(id);
  }

  // @Put(':id')
  // update(
  //   @Param('id') id: number,
  //   @Body() updatePurchaseDto: UpdatePurchaseDto,
  // ): Promise<Purchase | null> {
  //   return this.purchaseService.update(id, updatePurchaseDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.purchaseService.remove(id);
  }
}
