import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MicroserviceConnection } from '../../helpers/constants';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schema/order.schema';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            return {
              uri: 'mongodb://localhost:27017?retryWrites=false&w=majority',
              dbName: 'order',
            };
          },
        }),
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
                  host: configService.get<string>('payment.host'),
                  port: +configService.get<string>('payment.port'),
                },
              };
            },
          },
        ]),
      ],
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });
});
