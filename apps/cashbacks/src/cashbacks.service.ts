import { PageService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { CashbacksRepository } from './cashbacks.repository';
import { CreateCashbackDto } from './dto/request/create-cashback.dto';
import { RemoveCashbackDto } from './dto/request/remove-cashback.dto';

@Injectable()
export class CashbacksService extends PageService {
  private readonly logger = new Logger(CashbacksService.name)
  constructor(
    private readonly cashbackRepository: CashbacksRepository,
  ) { super() }

  create(createCashbackDto: CreateCashbackDto) {
    return this.cashbackRepository.create(createCashbackDto)
  }

  update(id: string, updateCashbackDto: CreateCashbackDto) {
    return this.cashbackRepository.findOneAndUpdate({ _id: id }, updateCashbackDto)
  }

  remove(id: string, updateCashbackDto: RemoveCashbackDto) {
    return this.cashbackRepository.findOneAndUpdate({ _id: id }, updateCashbackDto)
  }
  

  async getCashbacks(data) {
    data = { ...data, status: 1 }
    return this.generatePage(data, this.cashbackRepository)
  }

  async calculateCashback(data: any) {
    let cashbackTrx
    cashbackTrx = await this.getCashback(data)

    if(cashbackTrx){
      cashbackTrx = (cashbackTrx.percentageCashback / 100) * data.transaction.checkoutTotal
    }else{
      cashbackTrx = 0
    }

    return cashbackTrx
  }

  getCashback(data: any){
    return this.cashbackRepository.findOne({
      $or: [
        {
          status: 1,
          cashbackReferCode: data.transaction.cashbackReferCode
        },
        {
          status: 1,
          isSetMaxQty: 1,
          minQty: { $lte: data.transaction.qty },
          maxQty: { $gte: data.transaction.qty },
          isSetMaxAmountTrans: 1,
          minAmountTrans: { $lte: data.transaction.checkoutTotal },
          maxAmountTrans: { $gte: data.transaction.checkoutTotal }
        },
        {
          status: 1,
          isSetMaxQty: 1,
          minQty: { $lte: data.transaction.qty },
          maxQty: { $gte: data.transaction.qty },
          isSetMaxAmountTrans: 0,
          minAmountTrans: { $gte: data.transaction.checkoutTotal },
        },
        {
          status: 1,
          isSetMaxQty: 0,
          minQty: { $gte: data.transaction.qty },
          isSetMaxAmountTrans: 0,
          minAmountTrans: { $gte: data.transaction.checkoutTotal },
        }
      ]
    })
  }
}
