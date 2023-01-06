import { PartnersModule } from './partners.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger/dist';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(PartnersModule);

  //config microservice
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOptions('PARTNER'),{ inheritAppConfig: true })
  await app.startAllMicroservices()

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true,
    validateCustomDecorators: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  //initialitation swagger doc builder
  const configSwagger = new DocumentBuilder()
  .setTitle('Kezbek API Documentation')
  .setDescription('Documentation API for Service Partners')
  .setVersion('1.2')
  .addCookieAuth()
  .setExternalDoc('Postman Collection', 'doc-json')
  .build()

  //config custom swagger
  const configCustomSwagger: SwaggerCustomOptions = {
    swaggerOptions: {docExpansion: "none"}
  }

  //create swagger doc
  const doc = SwaggerModule.createDocument(app,configSwagger)
  SwaggerModule.setup('doc',app,doc,configCustomSwagger)

  //config port
  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT_PARTNERS'));
}
bootstrap();
