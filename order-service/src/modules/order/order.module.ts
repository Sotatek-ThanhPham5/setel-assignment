import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DeliverOrderService } from '../../helpers/jobs/deliver-order-job';
import { MicroserviceConnection } from '../../helpers/constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: MicroserviceConnection.serviceName,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: configService.get<string>('PAYMENT_HOST'),
              port: +configService.get<string>('PAYMENT_PORT'),
            },
          };
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, DeliverOrderService],
})
export class OrderModule {}
