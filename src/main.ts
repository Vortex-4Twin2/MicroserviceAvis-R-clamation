import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ExternalConfigService } from './config/external-config.service';
import { Partitioners } from 'kafkajs';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // ✅ نجيب config من Config Server
  const configService = app.get(ExternalConfigService);
  await configService.loadConfig();

  // ✅ Kafka 
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
        retry: {
          retries: 10,
          initialRetryTime: 3000,
        },
      },
      consumer: {
        groupId: 'avis-consumer',
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner,
      },
    },
  });

  await app.startAllMicroservices();

  // ✅ port من config server
  const port = configService.get('server.port') || 3000;

  await app.listen(port);

  console.log(`🚀 HTTP + Kafka + Eureka OK on port ${port}`);
}

bootstrap();