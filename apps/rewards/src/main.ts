import { RmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger/dist';
import { RewardsModule } from './rewards.module';

async function bootstrap() {
  const app = await NestFactory.create(RewardsModule);

   //config microservice
   const rmqService = app.get<RmqService>(RmqService)
   app.connectMicroservice(rmqService.getOptions('REWARD'),{ inheritAppConfig: true })
   await app.startAllMicroservices()
 
   //initialitation swagger doc builder
   const configSwagger = new DocumentBuilder()
   .setTitle('Kezbek API Documentation')
   .setDescription('Documentation API for Service Rewards')
   .setVersion('1.2')
   .addBasicAuth()
   .setExternalDoc('Postman Collection', 'doc-json')
   .build()
 
   //config custom swagger
   const configCustomSwagger: SwaggerCustomOptions = {
     swaggerOptions: {docExpansion: "none"}
   }
 
   //create swagger doc
   const doc = SwaggerModule.createDocument(app,configSwagger)
   SwaggerModule.setup('doc',app,doc,configCustomSwagger)
 
   //config port for hybrid app
   const configService = app.get(ConfigService)
   await app.listen(configService.get('PORT_REWARDS'));
}
bootstrap();
