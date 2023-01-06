import { JwtAuthGuard, RmqService } from '@app/common';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateRewardDto } from './dto/reward/request/create-reward.dto';
import { RequestRewardDto } from './dto/reward/request/request-reward.dto';
import { CreateRewardResponseDto } from './dto/reward/response/create-reward.response.dto';
import { ResponseBadRequestDto } from './dto/reward/response/response-bad-request.dto';
import { ResponseRewardDto } from './dto/reward/response/response-reward.dto';
import { ResponseServerErrorDto } from './dto/reward/response/response-server-error.dto';
import { RewardsService } from './rewards.service';
@ApiTags('Rewards')
@UseGuards(JwtAuthGuard)
@Controller('rewards')
export class RewardsController {
  constructor(
    private readonly rewardsService: RewardsService,
    private readonly rmqService: RmqService
  ) {}

  @Post()
  @ApiOkResponse({type: CreateRewardResponseDto})
  @ApiBadRequestResponse({type: ResponseBadRequestDto})
  @ApiInternalServerErrorResponse({type: ResponseServerErrorDto})
  async create(@Body() createRewardDto: CreateRewardDto) {
    const rewardData = await this.rewardsService.create(createRewardDto);

    return new CreateRewardResponseDto(
      HttpStatus.OK,
      `Create new reward data successfully`,
      rewardData
    )
  }

  @Get()
  @ApiOkResponse({type: ResponseRewardDto})
  async getRewards(@Query() data: RequestRewardDto){
    return this.rewardsService.getRewards(data)
  }

  @Patch(':id')
  @ApiOkResponse({type: CreateRewardResponseDto})
  @ApiBadRequestResponse({type: ResponseBadRequestDto})
  @ApiInternalServerErrorResponse({type: ResponseServerErrorDto})
  async update(@Param('id') id: string, @Body() updateRewardDto: CreateRewardDto) {
    const rewardData = await this.rewardsService.update(id, updateRewardDto);

    return new CreateRewardResponseDto(
      HttpStatus.OK,
      `reward data success updated`,
      rewardData
    )
  }

  @Delete(':id')
  @ApiOkResponse({type: CreateRewardResponseDto})
  @ApiBadRequestResponse({type: ResponseBadRequestDto})
  @ApiInternalServerErrorResponse({type: ResponseServerErrorDto})
  async remove(@Param('id') id: string) {
    const rewardData =  await this.rewardsService.remove(id);

    return new CreateRewardResponseDto(
      HttpStatus.OK,
      `reward data success deleted`,
      rewardData
    )
  }

  @MessagePattern('calculate_reward')
  async handleTransactionCreated(@Payload() data: any, @Ctx() context?: RmqContext){
    const cashbackReward = await this.rewardsService.calculateReward(data)
    if(context)
      this.rmqService.ack(context)

    return cashbackReward
  }
}
