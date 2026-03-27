import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AvisDocument = Avis & Document;

@Schema({ timestamps: true }) // 🔥 important
export class Avis {

  @Prop({ required: true })
  commandeId: string;

  @Prop({ required: true })
  livraisonId: string;

  @Prop({ default: 'AUTO' })
  clientId: string;

  @Prop({ default: '' })
  commentaire: string;

  @Prop({ default: 5 })
  note: number;

  @Prop({ enum: ['AVIS', 'RECLAMATION'], default: 'AVIS' })
  type: string;
}

export const AvisSchema = SchemaFactory.createForClass(Avis);