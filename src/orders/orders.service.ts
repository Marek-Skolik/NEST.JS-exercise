import { Injectable } from '@nestjs/common';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  
  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({ include: { product: true, client: true } });
  }

  public async getById(id: Order['id']): Promise<Order | null> {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      include: { product: true, client: true },
    });
    if(!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  public async removeOrder(id: Order['id']): Promise<Order> {
    const order = await this.prismaService.order.findUnique({
      where: { id }
    });
    if(!order) {
      throw new NotFoundException('Order not found');
    }
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public async create(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const { productId, clientId, ...otherData } = orderData;
    try {
      return await this.prismaService.order.create({
        data: {
          ...otherData,
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId}
          }
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException("Product doesn't exist");
      throw error;
    }
  }  

  public async updateById(id: Order['id'], orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const { productId, clientId, ...otherData } = orderData;
    const order = await this.prismaService.order.findUnique({
      where: { id },
    });
    if(!order) {
      throw new NotFoundException('Order not found');
    }

    return this.prismaService.order.update({
      where: { id },
      data: {
        ...otherData,
        product: {
          connect: { id: productId },
        },
        client: {
          connect: { id: clientId },
        }
      },
    });
  }
}
