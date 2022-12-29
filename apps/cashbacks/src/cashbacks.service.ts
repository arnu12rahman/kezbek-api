import { PageService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { TransactionsRepository } from 'apps/transactions/src/transactions.repository';
import { CashbacksRepository } from './cashbacks.repository';
import { CreateCashbackDto } from './dto/create-cashback.dto';

@Injectable()
export class CashbacksService extends PageService{
  private readonly logger = new Logger(CashbacksService.name)
  constructor(
    private readonly transactionRepository: TransactionsRepository,
    private readonly cashbackRepository: CashbacksRepository,
  ){super()}
  
  create(createCashbackDto: CreateCashbackDto) {
    return this.cashbackRepository.create(createCashbackDto)
  }

  update(id: string, updateUserDto: CreateCashbackDto) {
    return this.cashbackRepository.findOneAndUpdate({_id: id},updateUserDto)
  }

  remove(id: string) {
    return this.cashbackRepository.findOneAndUpdate({_id: id},{ "$set": {
      status: 0,
      isDeleted: 1
    }})
  }

  async getCashbacks(data){
    return this.generatePage(data, this.cashbackRepository)
  }

  calculateCashback(data: any){
    this.transactionRepository.findOneAndUpdate({_id: data.transaction._id},{ "$set": {
      cashbackTrx: 2000,
      cashbackReward: 1000,
      cashbackTotal: 3000
    }})
  }
}
