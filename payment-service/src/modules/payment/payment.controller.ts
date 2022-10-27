import { Controller, InternalServerErrorException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @EventPattern('order_created')
  async handleCreateOrder(data) {
    try {
      await this.paymentService.createOrder(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @EventPattern('cancel_order')
  async handleCancelOrder(transactionId) {
    try {
      await this.paymentService.cancelOrder(transactionId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
