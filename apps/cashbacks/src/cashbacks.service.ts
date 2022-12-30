import { PageService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { TransactionsRepository } from 'apps/transactions/src/transactions.repository';
import { CashbacksRepository } from './cashbacks.repository';
import { CreateCashbackDto } from './dto/create-cashback.dto';

@Injectable()
export class CashbacksService extends PageService {
  private readonly logger = new Logger(CashbacksService.name)
  constructor(
    private readonly transactionRepository: TransactionsRepository,
    private readonly cashbackRepository: CashbacksRepository,
  ) { super() }

  create(createCashbackDto: CreateCashbackDto) {
    return this.cashbackRepository.create(createCashbackDto)
  }

  update(id: string, updateUserDto: CreateCashbackDto) {
    return this.cashbackRepository.findOneAndUpdate({ _id: id }, updateUserDto)
  }

  remove(id: string) {
    return this.cashbackRepository.findOneAndUpdate({ _id: id }, {
      "$set": {
        status: 0,
        isDeleted: 1
      }
    })
  }

  async getCashbacks(data) {
    data = { ...data, status: 1 }
    return this.generatePage(data, this.cashbackRepository)
  }

  async calculateCashback(data: any) {
    let cashbackTrx
    if (data.transaction.cashback_refer_code != 'cashback_refer_code')
      cashbackTrx = await this.getByReferCode(data)

    if(!cashbackTrx)
      cashbackTrx = await this.getByMinMaxQtyAmount(data)

    if(!cashbackTrx)
      cashbackTrx = await this.getByMinMaxQtyMinAmount(data)

    if(!cashbackTrx)
      cashbackTrx = await this.getByMinRefer(data)

    if(!cashbackTrx){
      cashbackTrx = 0
    }else{
      cashbackTrx = (cashbackTrx.percentageCashback / 100) * data.transaction.checkoutTotal
    }

    this.transactionRepository.findOneAndUpdate({_id: data.transaction._id},{ "$set": {
      cashbackTrx: cashbackTrx,
    }})
  }

  getByReferCode(data: any) {
    return this.cashbackRepository.findOne({
      status: 1,
      cashbackReferCode: data.transaction.cashbackReferCode
    })
  }

  getByMinMaxQtyAmount(data: any) {
    return this.cashbackRepository.findOne({
      status: 1,
      isSetMaxQty: 1,
      minQty: { $gte: data.transaction.qty },
      maxQty: { $lte: data.transaction.qty },
      isSetMaxAmountTrans: 1,
      $or: [
        { minAmountTrans: { $gt: data.transaction.checkoutTotal, $lt: data.transaction.checkoutTotal } },
        { maxAmountTrans: { $gt: data.transaction.checkoutTotal, $lt: data.transaction.checkoutTotal } },
        { minAmountTrans: { $lt: data.transaction.checkoutTotal }, maxAmountTrans: { $gt: data.transaction.checkoutTotal } }
      ]
    })
  }
  
  getByMinMaxQtyMinAmount(data: any) {
    return this.cashbackRepository.findOne({
      status: 1,
      isSetMaxQty: 1,
      minQty: { $gte: data.transaction.qty },
      maxQty: { $lte: data.transaction.qty },
      isSetMaxAmountTrans: 0,
      minAmountTrans: { $gte: data.transaction.checkoutTotal },
    })
  }

  getByMinRefer(data: any) {
    return this.cashbackRepository.findOne({
      status: 1,
      isSetMaxQty: 0,
      minQty: { $gte: data.transaction.qty },
      isSetMaxAmountTrans: 0,
      minAmountTrans: { $gte: data.transaction.checkoutTotal },
    })
  }
}
