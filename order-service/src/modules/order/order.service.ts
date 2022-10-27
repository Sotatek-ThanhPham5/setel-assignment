import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { OrderStatus } from './order.constant';
import { v4 as uuidv4 } from 'uuid';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceConnection } from 'src/helpers/constants';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @Inject('PAYMENT_SERVICE')
    private readonly paymentServiceClient: ClientProxy,
  ) {}

  async getAll() {
    try {
      const [careerList, totalItems] = await Promise.all([
        this.orderModel.find().sort({ createdAt: -1 }).exec(),
        this.orderModel.count(),
      ]);
      return {
        items: careerList,
        totalItems,
      };
    } catch (error) {
      throw error;
    }
  }

  async find(id: string) {
    try {
      const order = await this.orderModel.findById(id);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async create(dto) {
    try {
      dto.status = OrderStatus.Created;
      dto.transactionId = uuidv4();
      const order = await this.orderModel.create(dto);
      this.paymentServiceClient.emit(
        MicroserviceConnection.eventName.ORDER_CREATED,
        order,
      );
      return order;
    } catch (error) {
      throw error;
    }
  }

  async cancelOrder(id: string) {
    try {
      const orderCanceled = await this.orderModel.findByIdAndUpdate(
        id,
        { status: OrderStatus.Canceled },
        {
          returnDocument: 'after',
        },
      );
      await this.paymentServiceClient.emit(
        MicroserviceConnection.eventName.CANCEL_ORDER,
        orderCanceled.transactionId,
      );
      return orderCanceled;
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(orderDetail) {
    try {
      await this.orderModel.updateOne(
        { transactionId: orderDetail.transactionId },
        { status: orderDetail.status },
      );
    } catch (error) {
      throw error;
    }
  }

  async deliverOrder() {
    try {
      const query = {
        status: OrderStatus.Confirmed,
      };
      await this.orderModel.updateMany(query, {
        status: OrderStatus.Delivered,
      });
    } catch (error) {
      throw error;
    }
  }
}
