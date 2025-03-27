import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/common/entities/product.entity';
import { UpdateProductDto } from 'src/common/dto/product/updateProduct.dto';
import { CreateProductDto } from 'src/common/dto/product/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
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
