import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AvisService } from './avis.service';

@Controller()
export class AvisConsumer {

  constructor(private readonly avisService: AvisService) {}

  @EventPattern('livraison_livree')
  async handleLivraison(@Payload() message: any) {

    const data = message.value || message; // 🔥 fix kafka format

    console.log("🔥 Message reçu depuis Kafka :", data);

    await this.avisService.create({
      commandeId: data.orderId,
      livraisonId: data.id,
      clientId: "AUTO",
      commentaire: "Livraison effectuée automatiquement",
      note: 5,
      type: "AVIS"
    });
  }
}