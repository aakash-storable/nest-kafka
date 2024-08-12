import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['nestjs-kafka-poc-broker:9092', 'nestjs-kafka-poc-broker:9093'],
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner,
      },
      consumer: {
        groupId: 'abc',
      },
    }
  });

  await app.startAllMicroservices();
  await app.listen(3001);

}


bootstrap();

