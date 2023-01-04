import { RmqService } from '@app/common';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateRewardDto } from './dto/reward/create-reward.dto';
import { RequestRewardDto } from './dto/reward/request-reward.dto';
import { ResponseRewardDto } from './dto/reward/response-reward.dto';
import { RewardsService } from './rewards.service';
@ApiTags('Rewards')
@Controller('rewards')
export class RewardsController {
  constructor(
    private readonly rewardsService: RewardsService,
    private readonly rmqService: RmqService
  ) {}

  @Post()
  create(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardsService.create(createRewardDto);
  }

  @Get()
  @ApiOkResponse({type: ResponseRewardDto})
  async getRewards(@Query() data: RequestRewardDto){
    return this.rewardsService.getRewards(data)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRewardDto: CreateRewardDto) {
    return this.rewardsService.update(id, updateRewardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rewardsService.remove(id);
  }

  @MessagePattern('calculate_reward')
  async handleTransactionCreated(@Payload() data: any, @Ctx() context: RmqContext){
    const cashbackReward = await this.rewardsService.calculateReward(data)
    this.rmqService.ack(context)

    return cashbackReward
  }
}
