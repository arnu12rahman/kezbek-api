import { PageService } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, firstValueFrom } from 'rxjs';
import { CASHBACK_SERVICE, NOTIFICATION_SERVICE, REWARD_SERVICE } from './constants/service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsRepository } from './transactions.repository';
@Injectable()
export class TransactionsService extends PageService {
  constructor(
    private readonly transactionRepository: TransactionsRepository,
    @Inject(CASHBACK_SERVICE) private cashbackClient: ClientProxy,
    @Inject(REWARD_SERVICE) private rewardClient: ClientProxy,
    @Inject(NOTIFICATION_SERVICE) private notificationClient: ClientProxy,
  ) { super() }

  async createTransaction(request: CreateTransactionDto) {
    const session = await this.transactionRepository.startTransaction()
    try {
      const transaction = await this.transactionRepository.create(request, { session })

      //get cashback
      const cashbackReward = await firstValueFrom(this.rewardClient.send('calculate_reward', { transaction }))
      const cashbackTrx = await firstValueFrom(this.cashbackClient.send('calculate_cashback', { transaction }))

      //calculate cashback
      const cashbackTotal = this.calculateCashback(transaction._id, cashbackReward, cashbackTrx)
      await session.commitTransaction()

      return cashbackTotal
    } catch (err) {
      await session.abortTransaction()
      throw err
    }
  }

  async getTransactions(data) {
    return this.generatePage(data, this.transactionRepository)
  }

  async calculateCashback(_id: any, cashbackReward: number, cashbackTrx: number) {
    const transData = await this.transactionRepository.upsert({ _id: _id }, { cashbackReward: cashbackReward, cashbackTrx: cashbackTrx, cashbackTotal: cashbackTrx + cashbackReward })

    //call service notification 
    await lastValueFrom(this.notificationClient.emit('send_notification', { transData }))

    return transData
  }
}
