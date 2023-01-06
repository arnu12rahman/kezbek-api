import { PageService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { CreateWalletDto } from './dto/request/create-wallet.dto';
import { WalletsRepository } from './wallets.repository';

@Injectable()
export class WalletsService extends PageService{
  private readonly logger = new Logger(WalletsService.name)

  constructor(
    private readonly walletRepository: WalletsRepository,
  ) { super() }

  async create(createWalletDto: CreateWalletDto) {
    //get last balance 
    let lastBalance = 0
    const walletData = await this.walletRepository.findOneSort({customerEmail: createWalletDto.customerEmail}, {createdAt:-1})

    if(walletData)
      lastBalance =  walletData.balance

    createWalletDto = {...createWalletDto, balance: createWalletDto.balance + lastBalance, lastBalance: lastBalance}
    
    return this.walletRepository.create(createWalletDto)
  }

  async getWallets(data) {
    data = { ...data, status: 1 }
    return this.generatePage(data, this.walletRepository)
  }
}
