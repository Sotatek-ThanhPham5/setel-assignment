import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MicroserviceConnection } from '../../helpers/constants';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schema/order.schema';

describe('OrderService', () => {
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
  it('call get all order service', async () => {
    const getAllSpy = jest.spyOn(service, 'getAll');
    await service.getAll();
    expect(getAllSpy).toHaveBeenCalled();
  });

  it('call get detail order service', async () => {
    const orderId = '636391515d415be25f727466';
    const getDetailSpy = jest.spyOn(service, 'find');
    await service.find(orderId);
    expect(getDetailSpy).toHaveBeenCalledWith(orderId);
  });

  it('call create order service', async () => {
    const newOrder = {
      name: 'order test service',
      amount: 10000,
    };
    const createOrderSpy = jest.spyOn(service, 'create');
    await service.create(newOrder);
    expect(createOrderSpy).toHaveBeenCalledWith(newOrder);
  });

  it('call cancel order service', async () => {
    const orderId = '636391515d415be25f727466';

    const cancelOrderSpy = jest.spyOn(service, 'cancelOrder');
    await service.cancelOrder(orderId);
    expect(cancelOrderSpy).toHaveBeenCalledWith(orderId);
  });

  it('call deliver order service', async () => {
    const deliverOrderSpy = jest.spyOn(service, 'deliverOrder');
    await service.deliverOrder();
    expect(deliverOrderSpy).toHaveBeenCalled();
  });
});
