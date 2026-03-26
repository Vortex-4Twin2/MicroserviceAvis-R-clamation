import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Avis } from './avis.schema';

@Injectable()
export class AvisService {

  constructor(@InjectModel(Avis.name) private avisModel: Model<Avis>) {}

  // 🔵 Création générique
  async create(data: any) {
    return this.avisModel.create(data);
  }

  // 🔴 Création Réclamation (force type)
  async createReclamation(data: any) {
    return this.avisModel.create({
      ...data,
      type: 'RECLAMATION',
    });
  }

  // 🟢 Tous
  async findAll() {
    return this.avisModel.find();
  }

  // 🔍 Par ID
  async findById(id: string) {
    return this.avisModel.findById(id);
  }

  // ✏️ Update
  async update(id: string, data: any) {
    return this.avisModel.findByIdAndUpdate(id, data, { new: true });
  }

  // ❌ Delete
  async delete(id: string) {
    return this.avisModel.findByIdAndDelete(id);
  }

  // 🎯 Filtrer par type
  async findByType(type: string) {
    return this.avisModel.find({ type });
  }
}