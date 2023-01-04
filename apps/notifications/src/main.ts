import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { NotificationsModule } from './notifications.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);

  //config microservice
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOptions('NOTIFICATION'),{ inheritAppConfig: true })
  await app.startAllMicroservices()
}
bootstrap();
