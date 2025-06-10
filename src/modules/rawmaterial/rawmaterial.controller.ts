import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CreateRawMaterialDto } from 'src/common/dto/rawMaterial/createRaw.dto';
import { UpdateRawMaterialDto } from 'src/common/dto/rawMaterial/updateRaw.dto';
import { RawMaterial } from 'src/common/entities/rawMaterial.entity';
import { RawMaterialService } from './rawmaterial.service';

@Controller('rawmaterial')
export class RawMaterialController {
  constructor(private readonly rawMaterialService: RawMaterialService) { }

  @Post()
  async create(
    @Body() createRawMaterialDto: CreateRawMaterialDto,
  ) {
    return this.rawMaterialService.create(createRawMaterialDto);
  }

  @Get()
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.rawMaterialService.findAll(page, limit);
  }

  @Get('/list')
  getAll() {
    return this.rawMaterialService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RawMaterial | null> {
    return this.rawMaterialService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRawMaterialDto: UpdateRawMaterialDto,
  ): Promise<RawMaterial | null> {
    return this.rawMaterialService.update(id, updateRawMaterialDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.rawMaterialService.remove(id);
  }
}
