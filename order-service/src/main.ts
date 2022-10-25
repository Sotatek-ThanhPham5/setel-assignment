import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      host: configService.get('ORDER_HOST'),
      port: +configService.get('ORDER_PORT_MICROSERVICE'),
    },
  });
  await app.startAllMicroservicesAsync();

  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe());

  const corsOptions: CorsOptions = {
    origin: '*',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Language',
      'X-Timezone',
      'X-Timezone-Name',
    ],
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  };
  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle('Order')
    .setDescription('The orders API description')
    .setVersion('1.0')
    .addTag('Order')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(+configService.get('ORDER_PORT'));
}
bootstrap();
