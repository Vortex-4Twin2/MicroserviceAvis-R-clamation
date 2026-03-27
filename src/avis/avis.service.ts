import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Avis } from './avis.schema';

@Injectable()
export class AvisService {

  constructor(@InjectModel(Avis.name) private avisModel: Model<Avis>) {}

  // 🔵 Création générique + anti-duplicate
  async create(data: any) {

    // ✅ check duplication
    const exists = await this.avisModel.findOne({
      livraisonId: data.livraisonId,
      type: 'AVIS'
    });

    if (exists) {
      console.log("⚠️ Avis déjà existant pour cette livraison");
      return exists;
    }

    return this.avisModel.create(data);
  }

  async createReclamation(data: any) {
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
    return this.avisModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return this.avisModel.findByIdAndDelete(id);
  }

  async findByType(type: string) {
    return this.avisModel.find({ type });
  }
}