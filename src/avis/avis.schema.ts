import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AvisDocument = Avis & Document;

@Schema()
export class Avis {

  @Prop()
  commandeId: string;

  @Prop()
  livraisonId: string;

  @Prop()
  clientId: string;

  @Prop()
  commentaire: string;

  @Prop()
  note: number;

  @Prop()
  type: string; // AVIS ou RECLAMATION
}

export const AvisSchema = SchemaFactory.createForClass(Avis);