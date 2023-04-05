import { Controller, Get, Post, Put, Param, Delete, ParseUUIDPipe, NotFoundException, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './create-order-dto';
import { UpdateOrderDTO } from './update-order-dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get('/')
  getAll(): any {
    return this.orderService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.orderService.getById(id);
  } 

  @Delete('/:id')
  removeOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    this.orderService.removeOrder(id);
    return { success: true }
  }

  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.orderService.create(orderData)
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    this.orderService.updateById(id, orderData);
    return { success: true };
  }
}
