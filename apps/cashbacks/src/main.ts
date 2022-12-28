import { NestFactory } from '@nestjs/core';
import { CashbacksModule } from './cashbacks.module';

async function bootstrap() {
  const app = await NestFactory.create(CashbacksModule);
  await app.listen(3000);
}
bootstrap();
