import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Product } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  public getAllExtended(): Promise<Product[]> {
    return this.prismaService.product.findMany({ include: { orders: true } });
  }

  public async getById(id: Product['id']): Promise<Product | null> {
    const prod = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!prod) throw new NotFoundException('Product not found');

    return prod
  }

  public async getByIdExtended(id: Product['id']): Promise<Product | null> {
    const prod = await this.prismaService.product.findUnique({
      where: { id },
      include: { orders: true },
    });
    if (!prod) throw new NotFoundException('Product not found');

    return prod
  }

  public async removeProduct(id: Product['id']): Promise<Product> {
    const prod = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!prod) throw new NotFoundException('Product not found');

    return this.prismaService.product.delete({
      where: { id },
    });
  }

  public create(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return this.prismaService.product.create({
      data: productData,
    });
  }

  public async updateById(id: Product['id'], productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const prod = await this.prismaService.product.findUnique({
      where: { id },
    });
    
    if (!prod) throw new NotFoundException('Product not found');

    return this.prismaService.product.update({
      where: { id },
      data: productData,
    });
  };

}