import { Body, Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ProductionService } from './production.service';
import { UpdateMachineDto } from 'src/common/dto/machine/updateMachine.dto';
import { CreateProductionDto } from 'src/common/dto/production/createProduction.dto';
import { UpdateStatusDto } from 'src/common/dto/production/updateStatus.dto';

@Controller('production')
export class ProductionController {
    constructor(private readonly productionService: ProductionService) { }

    @Get()
    findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        return this.productionService.find(page, limit);
    }

    @Get('report')
    getProductionReport(@Query('start') start:string, @Query('end') end:string){
        return this.productionService.getBetweenDate(start, end);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.productionService.findOne(id);
    }

    @Post()
    create(@Body() production: CreateProductionDto) {
        return this.productionService.create(production);
    }

    @Patch(':id')
    updateStatus(@Param('id') id: number, @Body() updateStatusDto: UpdateStatusDto){
        return this.productionService.updateStatus(+id, updateStatusDto);
    }
    // @Put(':id')
    // update(
    //     @Param('id') id: number,
    //     @Body() production: any,
    // ) {
    //     return this.productionService.update(id, production);
    // }

}
