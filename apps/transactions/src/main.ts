import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TransactionsModule } from './transactions.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger/dist';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(TransactionsModule);
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
  .setDescription('Documentation API for Service Transactions')
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
  await app.listen(configService.get('PORT'));
}
bootstrap();
