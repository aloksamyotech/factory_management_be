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
import { VendorService } from './vendor.service';
import { CreateVendorDto } from 'src/common/dto/vendor/createVendor.dto';
import { UpdateVendorDto } from 'src/common/dto/vendor/updateVendor.dto';
import { Vendor } from 'src/common/entities/vendor.entity';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) { }

  @Post()
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.vendorService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Vendor | null> {
    return this.vendorService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateVendorDto: UpdateVendorDto,
  ): Promise<Vendor | null> {
    return this.vendorService.update(id, updateVendorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.vendorService.remove(id);
  }
}
