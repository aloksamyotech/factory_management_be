import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from 'src/common/entities/product.entity';
import { UpdateProductDto } from 'src/common/dto/product/updateProduct.dto';
import { CreateProductDto } from 'src/common/dto/product/createProduct.dto';
import { RawMaterial } from 'src/common/entities/rawMaterial.entity';
import { Inventory } from 'src/common/entities/inventory.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(RawMaterial)
    private rawMaterialRepository: Repository<RawMaterial>,

    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, category, price, description, rawMaterial } =
      createProductDto;

    const raw = await this.rawMaterialRepository.find({
      where: { id: In(rawMaterial ?? []) },
    });
    const product = this.productRepository.create({
      name,
      category,
      price,
      description,
      rawMaterial: raw,
    });
    const saveProduct = await this.productRepository.save(product);

    const inventoryItem = this.inventoryRepository.create({
      productId: saveProduct,
      type: 'product',
    });
    await this.inventoryRepository.save(inventoryItem);

    return saveProduct;
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['rawMaterial'],
    });
  }

  findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } });
  }

  update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    this.productRepository.delete(id);
  }
}
