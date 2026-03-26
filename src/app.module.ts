import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AvisModule } from './avis/avis.module';
import { EurekaService } from './eureka.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/avis_reclamation'),
    AvisModule,
  ],
  providers: [EurekaService], // ✅ OBLIGATOIRE
})
export class AppModule {}