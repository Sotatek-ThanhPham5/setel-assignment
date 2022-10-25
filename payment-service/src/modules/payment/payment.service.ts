import { Inject, Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { OrderStatus } from './payment.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './schema/payment.schema';

// const orderClient = ClientProxyFactory.create({
//   transport: Transport.TCP,
//   options: {
//     host: process.env.ORDER_HOST,
//     port: +process.env.ORDER_PORT_MICROSERVICE,
//   },
// });
@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @Inject('ORDER_SERVICE')
    private readonly ordertServiceClient: ClientProxy,
  ) {}
  // constructor(
  //   @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  // ) {}

  async createOrder(order) {
    try {
      const rand = Math.floor(Math.random() * 2);
      const status = rand > 0 ? OrderStatus.Confirmed : OrderStatus.Canceled;
      await this.paymentModel.create({
        transactionId: order.transactionId,
        status: status,
      });
      // sleep 10 second
      await new Promise((resolve) => setTimeout(resolve, 10000));
      await this.ordertServiceClient.emit('payment_processed', {
        transactionId: order.transactionId,
        status: status,
      });
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
