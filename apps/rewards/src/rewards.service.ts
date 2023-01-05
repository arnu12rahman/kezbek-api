import { PageService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { TransactionsRepository } from 'apps/transactions/src/transactions.repository';
import { CreateRewardDto } from './dto/reward/request/create-reward.dto';
import { RewardsRepository } from './repository/rewards.repository';
import { TiersRepository } from './repository/tiers.repository';
import { TiersJourneyRepository } from './repository/tiers-journey.repository';
import * as moment from 'moment';
import { Mixin } from 'ts-mixer';
import { TierService } from './service/tier.service';
@Injectable()
export class RewardsService extends Mixin(PageService,TierService){
  private readonly logger = new Logger(RewardsService.name)
  constructor(
    private readonly transactionRepository: TransactionsRepository,
    private readonly rewardRepository: RewardsRepository,
    private readonly tierRepository: TiersRepository,
    private readonly tierJourneyRepository: TiersJourneyRepository,
  ){super()}
  
  create(createRewardDto: CreateRewardDto) {
    return this.rewardRepository.create(createRewardDto)
  }

  update(id: string, updateRewardDto: CreateRewardDto) {
    return this.rewardRepository.findOneAndUpdate({_id: id},updateRewardDto)
  }

  remove(id: string) {
    return this.rewardRepository.findOneAndUpdate({_id: id},{ "$set": {
      status: 0,
      isDeleted: 1
    }})
  }

  async getRewards(data){
    data = {...data, status: 1}
    return this.generatePage(data, this.rewardRepository)
  }

  async calculateReward(data: any){
    //get current tier
    const currTier = await this.getCurrentTier(data, this.transactionRepository, this.tierRepository, this.tierJourneyRepository)
    let cashbackReward 
    cashbackReward = await this.getReward(currTier.tier, currTier.trxRecurring)

    if(cashbackReward){
      cashbackReward = cashbackReward.rewardAmount
    }else{
      cashbackReward = 0
    }

    return cashbackReward
  }

  
  getReward(tier: string, recurring: number){
    return this.rewardRepository.findOne({
      status: 1,
      tier: tier,
      recurring: recurring
    })
  }
}
