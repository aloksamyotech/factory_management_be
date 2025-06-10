import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Repository } from 'typeorm';
import { Purchase } from 'src/common/entities/purchase.entity';
import { CreatePurchaseDto } from 'src/common/dto/purchase/createPurchase.dto';
import { RawMaterial } from 'src/common/entities/rawMaterial.entity';
import { Vendor } from 'src/common/entities/vendor.entity';
import { UpdatePurchaseDto } from 'src/common/dto/purchase/updatePurchase.dto';
import { PurchaseItems } from 'src/common/entities/purchaseItems.entity';

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
  ) { }

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
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

  async findAll(page: number, limit: number) {
    const data = await this.purchaseRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC'
      },
      relations: ['itemId', 'itemId.rawMaterial', 'vendorId'],
    });
    return data
  }

  findOne(id: number): Promise<Purchase | null> {
    return this.purchaseRepository.findOne({
      where: { id },
      relations: ['itemId', 'vendorId'],
    });
  }

  // update function for update purchase(not  working)
  // async update(id: number, updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase | null> {
  //   const { vendorId, productId, totalAmount, expectedDeliveryDate } =
  //     updatePurchaseDto;

  //   const vendor = await this.vendorRepository.findOne({
  //     where: { id: vendorId },
  //   });
  //   if (!vendor) {
  //     throw new Error('Vendor not found');
  //   }

  //   const products = await this.rawMaterialRepository.find({
  //     where: { id: In(productId) },
  //   });

  //   if (products.length !== productId.length) {
  //     throw new Error('Some products were not found');
  //   }
  //   this.purchaseRepository.update(id, {
  //     vendorId: vendor,
  //     productId: products,
  //     totalAmount,
  //     expectedDeliveryDate,
  //   });

  //   return this.purchaseRepository.findOne({
  //     where: { id },
  //     relations: ['productId', 'vendorId'],
  //   });
  // }

  remove(id: number) {
    this.purchaseRepository.delete(id);
  }
}
