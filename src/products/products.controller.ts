import { Controller, Get, Param, Delete, Post, Body, ParseUUIDPipe, Put, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './create-product.dto';
import { UpdateProductDTO } from './update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  
  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }

  @Get('/extended')
  getAllExtended(): any {
    return this.productsService.getAllExtended();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getById(id);
    return prod;
  }

  @Get('/extended/:id')
  async getByIdExtended(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getByIdExtended(id);
    return prod;
  }

  @Delete('/:id')
  async removeProduct(@Param('id', new ParseUUIDPipe()) id: string) {    
    await this.productsService.removeProduct(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
    ) {
      await this.productsService.updateById(id, productData);
      return { success: true };
    }
}
