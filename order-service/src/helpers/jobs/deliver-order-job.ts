import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderService } from '../../modules/order/order.service';

@Injectable()
export class DeliverOrderService {
  constructor(private readonly orderService: OrderService) {}
  private readonly logger = new Logger(DeliverOrderService.name);

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    try {
      this.logger.log(`Start deliver order job at: ${new Date()}`);
      await this.orderService.deliverOrder();
    } catch (error) {
      this.logger.error('Deliver order job error', error);
    }
  }
}
