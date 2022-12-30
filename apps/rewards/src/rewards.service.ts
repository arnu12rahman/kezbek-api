import { PageService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { TransactionsRepository } from 'apps/transactions/src/transactions.repository';
import { CreateRewardDto } from './dto/reward/create-reward.dto';
import { RewardsRepository } from './repository/rewards.repository';
import * as moment from 'moment';

@Injectable()
export class RewardsService extends PageService{
  private readonly logger = new Logger(RewardsService.name)
  constructor(
    private readonly transactionRepository: TransactionsRepository,
    private readonly rewardRepository: RewardsRepository,
  ){super()}
  
  create(createRewardDto: CreateRewardDto) {
    return this.rewardRepository.create(createRewardDto)
  }

  update(id: string, updateUserDto: CreateRewardDto) {
    return this.rewardRepository.findOneAndUpdate({_id: id},updateUserDto)
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
    const currTier = await this.getCurrentTier(data)
  }

  getCurrentTier(data: any){
    //check if any trx in current month
    const trxMonth = moment(data.transaction.trxDate).format('MM')
    const countTrxMonth = this.transactionRepository.findOne({
      $and: [{trxDate: `/-${trxMonth}-/`}, {trxDate: { $ne: data.transaction.trxDate }} ]
    })

    if(!countTrxMonth)
      this.downgradeTier(data)

    
  }

  downgradeTier(data: any){
    
  }
}
