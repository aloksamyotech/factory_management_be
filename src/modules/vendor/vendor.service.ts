import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomIDGenerator } from 'src/common/common/IdGen';
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

  async create(createVendorDto: CreateVendorDto) {
    const newVendor = this.vendorRepository.create(createVendorDto);
    let findId:any;
    let generatedID:string;
    do {
        generatedID = randomIDGenerator("VN",6);
        findId = await this.vendorRepository.findOne({where:{id:generatedID}});
    }while(findId);
    newVendor.id = generatedID;
    const data = await this.vendorRepository.save(newVendor);
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
  async getAll() {
    const data = await this.vendorRepository.find()
    return data
  }

  async findOne(id: string) {
    const data = await this.vendorRepository.findOne({ where: { id } });
    return data
  }

  async update(id: string, updateVendorDto: UpdateVendorDto) {
    await this.vendorRepository.update(id, updateVendorDto);
    const data = this.vendorRepository.findOne({ where: { id } });
    return data
  }

  remove(id: string) {
    this.vendorRepository.delete(id);
  }
}
