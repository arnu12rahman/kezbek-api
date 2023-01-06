import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { AuthModule } from './auth.module';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  //config microservice
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true));
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();

  //initialitation swagger doc builder
  const configSwagger = new DocumentBuilder()
    .setTitle('Kezbek API Documentation')
    .setDescription('Documentation API for Service Auth')
    .setVersion('1.2')
    .setExternalDoc('Postman Collection', 'doc-json')
    .build()

  //config custom swagger
  const configCustomSwagger: SwaggerCustomOptions = {
    swaggerOptions: { docExpansion: "none" }
  }

  //create swagger doc
  const doc = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('doc', app, doc, configCustomSwagger)

  //config port for hybrid app
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT_AUTH'));
}
bootstrap();
