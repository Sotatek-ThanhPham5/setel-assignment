import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { ErrorResponse, SuccessResponse } from 'src/helpers/response';
import { EventPattern } from '@nestjs/microservices';
import { OrderStatus } from './order.constant';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAll() {
    try {
      const orderList = await this.orderService.getAll();
      return new SuccessResponse(orderList);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('/:id')
  async getDetail(@Param('id') id: string) {
    try {
      const order = await this.orderService.find(id);
      if (!order) {
        return new ErrorResponse(404, 'Order not found');
      }
      return new SuccessResponse(order);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    try {
      const order = await this.orderService.create(dto);
      return new SuccessResponse(order);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put('/:id/cancel')
  async cancel(@Param('id') id: string) {
    try {
      const order = await this.orderService.find(id);
      if (!order) {
        return new ErrorResponse(404, 'Order not found');
      }
      if (order.status === OrderStatus.Delivered) {
        return new ErrorResponse(400, 'The order has been delivered');
      }
      const orderCanceled = await this.orderService.cancelOrder(id);
      return new SuccessResponse(orderCanceled);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @EventPattern('payment_processed')
  async handlePaymentProcessed(order) {
    try {
      const orderUpdated = await this.orderService.updateOrder(order);
      if (orderUpdated.status === OrderStatus.Confirmed) {
        await this.orderService.deliver(orderUpdated._id);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
