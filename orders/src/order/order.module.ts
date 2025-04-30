import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ClientsModule.register([
      {
        name: 'BOOK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://vaoemrel:3RWj7zutVTdtxzqfthqGeF42OYDHiF-k@moose.rmq.cloudamqp.com/vaoemrel'],
          queue: 'book_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'CUSTOMER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://vaoemrel:3RWj7zutVTdtxzqfthqGeF42OYDHiF-k@moose.rmq.cloudamqp.com/vaoemrel'],
          queue: 'customer_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
