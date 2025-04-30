import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const RABBITMQ_URL =
    'amqps://vaoemrel:3RWj7zutVTdtxzqfthqGeF42OYDHiF-k@moose.rmq.cloudamqp.com/vaoemrel';
  app.enableCors();
  await app.listen(3000);

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: 'customer_queue',
      queueOptions: { durable: false },
    },
  });

  await microservice.listen();
}
bootstrap();
