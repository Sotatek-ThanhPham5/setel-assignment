import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderStatus } from './payment.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './schema/payment.schema';
import { MicroserviceConnection } from 'src/helpers/constants';
@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @Inject(MicroserviceConnection.serviceName)
    private readonly ordertServiceClient: ClientProxy,
  ) {}

  async createOrder(order) {
    try {
      const rand = Math.floor(Math.random() * 2);
      const status = rand > 0 ? OrderStatus.Confirmed : OrderStatus.Canceled;
      await this.paymentModel.create({
        transactionId: order.transactionId,
        status: status,
      });
      await new Promise((resolve) => setTimeout(resolve, 10000));
      await this.ordertServiceClient.emit(
        MicroserviceConnection.eventName.PAYMENT_PROCESSED,
        {
          transactionId: order.transactionId,
          status: status,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async cancelOrder(transactionId: string) {
    try {
      await this.paymentModel.updateOne(
        { transactionId },
        { status: OrderStatus.Canceled },
      );
    } catch (error) {
      throw error;
    }
  }
}
