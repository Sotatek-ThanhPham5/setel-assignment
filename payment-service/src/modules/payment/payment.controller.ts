import { Controller, InternalServerErrorException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { EventPattern } from '@nestjs/microservices';
import { MicroserviceConnection } from 'src/helpers/constants';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @EventPattern(MicroserviceConnection.eventName.ORDER_CREATED)
  async handleCreateOrder(data) {
    try {
      await this.paymentService.createOrder(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @EventPattern(MicroserviceConnection.eventName.CANCEL_ORDER)
  async handleCancelOrder(transactionId) {
    try {
      await this.paymentService.cancelOrder(transactionId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
