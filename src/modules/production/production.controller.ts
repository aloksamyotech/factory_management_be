import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductionService } from './production.service';
import { UpdateMachineDto } from 'src/common/dto/machine/updateMachine.dto';

@Controller('production')
export class ProductionController {
    constructor(private readonly productionService: ProductionService) { }

    @Get()
    findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        return this.productionService.find(page, limit);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.productionService.findOne(id);
    }

    @Post()
    create(@Body() production: any) {
        return this.productionService.create(production);
    }

    // @Put(':id')
    // update(
    //     @Param('id') id: number,
    //     @Body() production: any,
    // ) {
    //     return this.productionService.update(id, production);
    // }

}
