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
  ) {}

  create(createVendorDto: CreateVendorDto): Promise<Vendor> {
    const vendor = this.vendorRepository.create(createVendorDto);
    return this.vendorRepository.save(vendor);
  }

  findAll(): Promise<Vendor[]> {
    return this.vendorRepository.find();
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
