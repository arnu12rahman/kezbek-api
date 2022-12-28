import { NestFactory } from '@nestjs/core';
import { RewardsModule } from './rewards.module';

async function bootstrap() {
  const app = await NestFactory.create(RewardsModule);
  await app.listen(3000);
}
bootstrap();
