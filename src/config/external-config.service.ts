import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExternalConfigService {
  private config: any = {};

  async loadConfig() {
    try {
      const res = await axios.get(
        'http://localhost:8097/microservice-avis-reclamation/default'
      );

      console.log('🔍 FULL RESPONSE:', res.data); // 
      this.config =
        res.data?.propertySources?.[0]?.source || {};

      console.log('✅ Config loaded:', this.config);
    } catch (err) {
      console.error('❌ Config Server error:', err.message);
    }
  }

  get(key: string) {
    return this.config[key];
  }
}