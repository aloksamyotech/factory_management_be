import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DeepPartial, In, Repository } from 'typeorm';
import { Purchase } from 'src/common/entities/purchase.entity';
import { CreatePurchaseDto } from 'src/common/dto/purchase/createPurchase.dto';
import { RawMaterial } from 'src/common/entities/rawMaterial.entity';
import { Vendor } from 'src/common/entities/vendor.entity';
import { UpdatePurchaseDto } from 'src/common/dto/purchase/updatePurchase.dto';
import { PurchaseItems } from 'src/common/entities/purchaseItems.entity';
import { UpdateStatusDto } from 'src/common/dto/production/updateStatus.dto';
import { Inventory } from 'src/common/entities/inventory.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(RawMaterial)
    private rawMaterialRepository: Repository<RawMaterial>,
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
    @InjectRepository(PurchaseItems)
    private purchaseItemQtyRepository: Repository<PurchaseItems>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) { }

  async create(createPurchaseDto: CreatePurchaseDto) {
    const { vendorId, productId, totalAmount, expectedDeliveryDate } =
      createPurchaseDto;

    const vendor = await this.vendorRepository.findOne({
      where: { id: vendorId },
    });

    if (!vendor) {
      throw new Error('Vendor not found');
    }
    const purchase = this.purchaseRepository.create({
      vendorId: vendor,
      totalAmount,
      expectedDeliveryDate,
    });
    const savePurchase = await this.purchaseRepository.save(purchase);
    productId.map(async (item) => {
      const raw = await this.rawMaterialRepository.findOne({
        where: { id: item.productId },
      });
      if (!raw) {
        return new Error('item not found');
      }
      const newPurchase = this.purchaseItemQtyRepository.create({
        purchase: savePurchase,
        rawMaterial: raw,
        quantity: item.quantity,
      });
      const saved = await this.purchaseItemQtyRepository.save(newPurchase);
      return saved;
    });
    return savePurchase;
  }

  async findAll(page: number, limit: number, vendorId: any) {
    const data = await this.purchaseRepository.findAndCount({
      where: {
        vendorId: {
          id: vendorId
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC'
      },
      relations: ['itemId', 'itemId.rawMaterial', 'vendorId'],
    });
    return data
  }
  async getBetweenDate(start:string,end:string){
      const data = await this.purchaseRepository.findAndCount({
          where: {createdAt: Between(new Date(start), new Date(end))},
          relations: ['itemId','itemId.rawMaterial','vendorId'],
          order:{createdAt: 'DESC'}
      });
      return data;
    }
  findOne(id: number) {
    const data = this.purchaseRepository.findOne({
      where: { id },
      relations: ['itemId', 'vendorId', 'itemId.rawMaterial'],
    });
    return data
  }

  remove(id: number) {
    this.purchaseRepository.delete(id);
  }

  async updateStatus(id: number, dto: UpdateStatusDto) {
    await this.purchaseRepository.update(id, { status: dto.status });

    const data = await this.purchaseRepository.findOne({ where: { id }, relations: ['itemId', 'itemId.rawMaterial'] });
    if (!data) {
      throw new Error('Purchase not found');
    }

    if (dto.status === 'completed') {

      data.itemId.map(async (item, i) => {
        const res = await this.inventoryRepository.findOne({ where: { rawMaterialId: { id: item.rawMaterial.id } }, relations: ['rawMaterialId'] })
        if (res) {
          res.quantity += item.quantity;
          await this.inventoryRepository.save(res);
        }
      }
      )
    }
    return data
  }

}
