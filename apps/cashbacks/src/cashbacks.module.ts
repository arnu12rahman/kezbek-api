import { Module } from '@nestjs/common';
import { CashbacksController } from './cashbacks.controller';
import { CashbacksService } from './cashbacks.service';

@Module({
  imports: [],
  controllers: [CashbacksController],
  providers: [CashbacksService],
})
export class CashbacksModule {}
