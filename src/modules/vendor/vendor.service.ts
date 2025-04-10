import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVendorDto } from 'src/common/dto/vendor/createVendor.dto';
import { UpdateVendorDto } from 'src/common/dto/vendor/updateVendor.dto';
import { Vendor } from 'src/common/entities/vendor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
  ) { }

  create(createVendorDto: CreateVendorDto) {
    const newVendor = this.vendorRepository.create(createVendorDto);
    const data = this.vendorRepository.save(newVendor);
    return data
  }

  async findAll(page: number, limit: number) {

    const data = await this.vendorRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC'
      }
    });
    return data
  }

  findOne(id: number): Promise<Vendor | null> {
    return this.vendorRepository.findOne({ where: { id } });
  }

  update(id: number, updateVendorDto: UpdateVendorDto): Promise<Vendor | null> {
    this.vendorRepository.update(id, updateVendorDto);
    return this.vendorRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    this.vendorRepository.delete(id);
  }
}
