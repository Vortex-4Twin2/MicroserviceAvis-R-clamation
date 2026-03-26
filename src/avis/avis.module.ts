import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Avis, AvisSchema } from './avis.schema';
import { AvisService } from './avis.service';
import { AvisController } from './avis.controller';
import { AvisConsumer } from './avis.consumer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Avis.name, schema: AvisSchema }
    ]),
  ],
  controllers: [AvisController, AvisConsumer],
  providers: [AvisService],
})
export class AvisModule {}