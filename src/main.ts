import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
app.connectMicroservice({
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
      retry: {
        retries: 10, // 🔥 important
        initialRetryTime: 3000,
      },
    },
    consumer: {
      groupId: 'avis-consumer',
    },
  },
});

  await app.startAllMicroservices();
  await app.listen(3000);

  console.log("🚀 HTTP + Kafka + Eureka OK");
}

bootstrap();