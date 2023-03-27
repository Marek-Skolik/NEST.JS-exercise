import { Controller, Get, Param, ParseUUIDPipe, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) {}

    @Get('/')
        getAll(): any {
        return this.productsService.getAll();
    };

    @Get('/:id')
        async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const prod = await this.productsService.getById(id);
        return prod;
    };

    @Post('/')
        create(@Body() productData: CreateProductDTO) {
        return this.productsService.create(productData);
    }
}
