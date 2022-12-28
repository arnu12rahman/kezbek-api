import { PageService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService extends PageService{
  constructor(private readonly transactionRepository: TransactionsRepository){ super()}

  async createTransaction(request: CreateTransactionDto){
    return this.transactionRepository.create(request)
  }

  async getTransactions(data){
    return this.generatePage(data, this.transactionRepository)
  }
}
