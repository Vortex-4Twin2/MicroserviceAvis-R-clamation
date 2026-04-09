import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Avis } from './avis.schema';
import axios from 'axios';

@Injectable()
export class AvisService {
  private readonly logger = new Logger(AvisService.name);
  private readonly PURGOMALUM_URL = 'https://www.purgomalum.com/service/json';

  constructor(@InjectModel(Avis.name) private avisModel: Model<Avis>) {}

  // 🛡️ Advanced Business Logic: Profanity Filter
  private async filterBadWords(text: string): Promise<string> {
    if (!text || text.trim() === '') return text;
    try {
      const response = await axios.get(this.PURGOMALUM_URL, {
        params: { text: text },
      });
      return response.data.result || text;
    } catch (error) {
      this.logger.error('Error calling PurgoMalum API:', error.message);
      // Fallback: return original text if API fails (or you could block it)
      return text;
    }
  }

  // 🔵 Création générique + anti-duplicate + filtering
  async create(data: any) {
    // 🔍 1. Filtering bad words
    if (data.commentaire) {
      data.commentaire = await this.filterBadWords(data.commentaire);
    }

    // ✅ 2. Check duplication
    const exists = await this.avisModel.findOne({
      livraisonId: data.livraisonId,
      type: 'AVIS',
    });

    if (exists) {
      this.logger.warn(`⚠️ Avis déjà existant pour cette livraison: ${data.livraisonId}`);
      return exists;
    }

    return this.avisModel.create(data);
  }

  async createReclamation(data: any) {
    // 🔍 Filtering bad words
    if (data.commentaire) {
      data.commentaire = await this.filterBadWords(data.commentaire);
    }

    return this.avisModel.create({
      ...data,
      type: 'RECLAMATION',
    });
  }

  async findAll() {
    return this.avisModel.find();
  }

  async findById(id: string) {
    return this.avisModel.findById(id);
  }

  async update(id: string, data: any) {
    // 🔍 Filtering bad words if updated
    if (data.commentaire) {
      data.commentaire = await this.filterBadWords(data.commentaire);
    }
    return this.avisModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return this.avisModel.findByIdAndDelete(id);
  }

  async findByType(type: string) {
    return this.avisModel.find({ type });
  }
}