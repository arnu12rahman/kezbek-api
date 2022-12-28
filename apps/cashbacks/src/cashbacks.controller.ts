import { Controller, Get } from '@nestjs/common';
import { CashbacksService } from './cashbacks.service';

@Controller()
export class CashbacksController {
  constructor(private readonly cashbacksService: CashbacksService) {}

  @Get()
  getHello(): string {
    return this.cashbacksService.getHello();
  }
}
