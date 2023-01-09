import { PageService } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, firstValueFrom } from 'rxjs';
import { CASHBACK_SERVICE, NOTIFICATION_SERVICE, PARTNER_SERVICE, REWARD_SERVICE, WALLET_SERVICE } from './constants/service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsRepository } from './transactions.repository';
@Injectable()
export class TransactionsService extends PageService {
  constructor(
    private readonly transactionRepository: TransactionsRepository,
    @Inject(CASHBACK_SERVICE) private cashbackClient: ClientProxy,
    @Inject(REWARD_SERVICE) private rewardClient: ClientProxy,
    @Inject(NOTIFICATION_SERVICE) private notificationClient: ClientProxy,
    @Inject(PARTNER_SERVICE) private partnerClient: ClientProxy,
    @Inject(WALLET_SERVICE) private walletClient: ClientProxy,
  ) { super() }

  async createTransaction(request: CreateTransactionDto, authentication: string) {
    try {
      const partnerData = await firstValueFrom(this.partnerClient.send('get_partner_detail', { request, Authentication: authentication }))
      if (!partnerData)
        throw new NotFoundException('Partner Data Not Found!')

      request = { ...request, partnerId: partnerData._id, partnerName: partnerData.partnerName }
      const transaction = await this.transactionRepository.create(request)

      //get cashback
      const cashbackReward = await lastValueFrom(this.rewardClient.send('calculate_reward', { transaction, Authentication: authentication }))
      const cashbackTrx = await firstValueFrom(this.cashbackClient.send('calculate_cashback', { transaction, Authentication: authentication }))

      //calculate cashback
      const cashbackTotal = this.calculateCashback(transaction._id, cashbackReward, cashbackTrx, authentication)

      return cashbackTotal
    } catch (err) {
      throw err
    }
  }

  async getTransactions(data) {
    return this.generatePage(data, this.transactionRepository)
  }

  async calculateCashback(_id: any, cashbackReward: number, cashbackTrx: number, authentication: string) {
    const transData = await this.transactionRepository.upsert({ _id: _id }, { cashbackReward: cashbackReward, cashbackTrx: cashbackTrx, cashbackTotal: cashbackTrx + cashbackReward })

    //call service notification 
    await lastValueFrom(this.notificationClient.emit('send_notification', { transData, Authentication: authentication }))
    await lastValueFrom(this.walletClient.emit('save_to_wallet', { transData, Authentication: authentication }))

    return transData
  }
}
