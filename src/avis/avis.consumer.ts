import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AvisService } from './avis.service';

@Controller()
export class AvisConsumer {

  constructor(private readonly avisService: AvisService) {}

  @EventPattern('livraison_livree')
  async handleLivraison(@Payload() data: any) {

    console.log("🔥 Message reçu depuis Kafka :", data);

    await this.avisService.create({
      commandeId: data.orderId,
      livraisonId: data.id,
      clientId: "AUTO",
      commentaire: "",
      note: 0,
      type: "AVIS"
    });
  }
}