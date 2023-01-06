import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { WalletsModule } from './wallets.module';
import { SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger/dist';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(WalletsModule);
  //config microservice
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOptions('WALLET'),{ inheritAppConfig: true })
  await app.startAllMicroservices()

  //initialitation swagger doc builder
  const configSwagger = new DocumentBuilder()
  .setTitle('Kezbek API Documentation')
  .setDescription('Documentation API for Service Wallets')
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
  await app.listen(configService.get('PORT_WALLETS'));
}
bootstrap();
