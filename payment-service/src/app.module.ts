import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentModule } from './modules/payment/payment.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGO_DATABSE_CONNECTION_STRING'),
          dbName: configService.get<string>('DATA_BASE_NAME'),
        };
      },
    }),
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
