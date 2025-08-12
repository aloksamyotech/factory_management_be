import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from 'src/common/entities/product.entity';
import { UpdateProductDto } from 'src/common/dto/product/updateProduct.dto';
import { CreateProductDto } from 'src/common/dto/product/createProduct.dto';
import { RawMaterial } from 'src/common/entities/rawMaterial.entity';
import { Inventory } from 'src/common/entities/inventory.entity';
import { randomIDGenerator } from 'src/common/common/IdGen';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(RawMaterial)
    private rawMaterialRepository: Repository<RawMaterial>,

    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, category, price, description, rawMaterial } =
      createProductDto;

    const raw = await this.rawMaterialRepository.find({
      where: { id: In(rawMaterial ?? []) },
    });
    let findId:any;
    let generatedID:string;
    do{
      generatedID = randomIDGenerator("PR",6)
      findId = await this.productRepository.findOne({where:{id:generatedID}});
    }while(findId);
    const product = this.productRepository.create({
      id:generatedID,
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

  async findAll(page: number, limit: number) {
    const data = await this.productRepository.findAndCount({
      relations: ['rawMaterial'],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC'
      }
    })
    return data
  }

  async findOne(id: string) {
    const data = await this.productRepository.findOne({ where: { id } });
    return data
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    const data = await this.productRepository.findOne({ where: { id } });
    return data
  }

  remove(id: string) {
    this.productRepository.delete(id);
  }
}
