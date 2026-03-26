import { Injectable, OnModuleInit } from '@nestjs/common';
const Eureka = require('eureka-js-client').Eureka;

@Injectable()
export class EurekaService implements OnModuleInit {

  onModuleInit() {

    const client = new Eureka({
      instance: {
        app: 'AVIS-RECLAMATION-SERVICE',
        instanceId: 'avis-reclamation-1',

        hostName: 'localhost',
        ipAddr: '127.0.0.1',

        port: {
          '$': 3000,
          '@enabled': true,
        },

        vipAddress: 'avis-reclamation-service',

        statusPageUrl: 'http://localhost:3000',
        healthCheckUrl: 'http://localhost:3000',
        homePageUrl: 'http://localhost:3000',

        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn',
        },
      },

     eureka: {
  host: 'localhost',
  port: 8761,
  servicePath: '/eureka/apps/',
  maxRetries: 10,
  requestRetryDelay: 2000,
}
    });

    client.start((error) => {
      if (error) {
        console.log('❌ Erreur Eureka:', error);
      } else {
        console.log('✅ Microservice enregistré dans Eureka');
      }
    });
  }
}