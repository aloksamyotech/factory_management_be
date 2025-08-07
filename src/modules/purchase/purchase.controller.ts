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
import { PurchaseService } from './purchase.service';
import { Purchase } from 'src/common/entities/purchase.entity';
import { UpdatePurchaseDto } from 'src/common/dto/purchase/updatePurchase.dto';
import { CreatePurchaseDto } from 'src/common/dto/purchase/createPurchase.dto';
import { UpdateStatusDto } from 'src/common/dto/production/updateStatus.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('vendorId') vendorId: any) {
    return this.purchaseService.findAll(page, limit, vendorId);
  }

  @Get('report')
  getProductionReport(@Query('start') start:string, @Query('end') end:string){
    return this.purchaseService.getBetweenDate(start, end);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.purchaseService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.purchaseService.remove(id);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: number, @Body() updateStatusDto: UpdateStatusDto) {
    return this.purchaseService.updateStatus(+id, updateStatusDto);
  }
}
