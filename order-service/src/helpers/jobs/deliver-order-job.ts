import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderService } from 'src/modules/order/order.service';

@Injectable()
export class DeliverOrderService {
  constructor(private readonly orderService: OrderService) {}
  private readonly logger = new Logger(DeliverOrderService.name);

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    try {
      await this.orderService.deliverOrder();
    } catch (error) {
      this.logger.error('Deliver order job error', error);
    }
  }
}
