import { Controller, Get } from '@nestjs/common';
import { RewardsService } from './rewards.service';

@Controller()
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Get()
  getHello(): string {
    return this.rewardsService.getHello();
  }
}
