import { Controller, Get, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }
@Get()
findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.inventoryService.findAll(page,limit);
  }
}
