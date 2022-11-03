import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { ErrorResponse, SuccessResponse } from '../../helpers/response';
import { EventPattern } from '@nestjs/microservices';
import { OrderStatus } from './order.constant';
import { ErrorMessage } from '../../helpers/errorMessage';
import { MicroserviceConnection } from '../../helpers/constants';

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
        return new ErrorResponse(404, ErrorMessage.ORDER_NOT_FOUND);
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
        return new ErrorResponse(404, ErrorMessage.ORDER_NOT_FOUND);
      }
      if (order.status === OrderStatus.Delivered) {
        return new ErrorResponse(400, ErrorMessage.ORDER_DELIVERED);
      }
      const orderCanceled = await this.orderService.cancelOrder(id);
      return new SuccessResponse(orderCanceled);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @EventPattern(MicroserviceConnection.eventName.PAYMENT_PROCESSED)
  async handlePaymentProcessed(order) {
    try {
      await this.orderService.updateOrder(order);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
