import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AvisService } from './avis.service';

@Controller('avis')
export class AvisController {

  constructor(private readonly service: AvisService) {}

  // 🔵 Créer (Avis ou Réclamation)
  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  // 🟣 Créer Réclamation (endpoint dédié)
  @Post('/reclamation')
  createReclamation(@Body() data: any) {
    return this.service.createReclamation(data);
  }

  // 🟢 Tous les documents
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // 🔵 Seulement les AVIS
  @Get('/type/avis')
  getAvis() {
    return this.service.findByType('AVIS');
  }

  // 🔴 Seulement les RÉCLAMATIONS
  @Get('/type/reclamation')
  getReclamations() {
    return this.service.findByType('RECLAMATION');
  }

  // 🔍 Par ID
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  // ✏️ Update
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  // ❌ Delete
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}