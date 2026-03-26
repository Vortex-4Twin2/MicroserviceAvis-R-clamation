import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AvisModule } from './avis/avis.module';
import { EurekaService } from './eureka.service';
import { ConfigModule } from './config/config.module';
import { ExternalConfigService } from './config/external-config.service';

@Module({
  imports: [
    ConfigModule, // 

    MongooseModule.forRootAsync({
      imports: [ConfigModule], // 
      inject: [ExternalConfigService],
      useFactory: async (config: ExternalConfigService) => ({
        uri:
          config.get('spring.data.mongodb.uri') ||
          'mongodb://localhost:27017/avis_reclamation',
      }),
    }),

    AvisModule,
  ],
  providers: [EurekaService],
})
export class AppModule {}