import { PageService } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CASHBACK_SERVICE, REWARD_SERVICE } from './constants/service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsRepository } from './transactions.repository';
@Injectable()
export class TransactionsService extends PageService{
  constructor(
    private readonly transactionRepository: TransactionsRepository,
    @Inject(CASHBACK_SERVICE) private cashbackClient: ClientProxy,
    @Inject(REWARD_SERVICE) private rewardClient: ClientProxy,
    ){ super()}

  async createTransaction(request: CreateTransactionDto){
    const session = await this.transactionRepository.startTransaction()
    try {
      const transaction = await this.transactionRepository.create(request, {session})
      await lastValueFrom(this.cashbackClient.emit('transaction_created', {transaction}))
      await lastValueFrom(this.rewardClient.emit('transaction_created', {transaction}))
      await session.commitTransaction()

      return transaction
    } catch (err) {
        await session.abortTransaction()
        throw err  
    }
  }

  async getTransactions(data){
    return this.generatePage(data, this.transactionRepository)
  }
}
