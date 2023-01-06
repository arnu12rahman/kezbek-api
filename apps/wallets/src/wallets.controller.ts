import { RmqService } from '@app/common';
import { Controller, Get, Query, HttpStatus } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RequestWalletDto } from './dto/request/request-wallet.dto';
import { CreateWalletResponseDto } from './dto/response/create-wallet.response.dto';
import { ResponseWalletDto } from './dto/response/response-wallet.dto';
import { WalletsService } from './wallets.service';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService, private readonly rmqService: RmqService) { }

  @Get()
  @ApiOkResponse({ type: ResponseWalletDto })
  async getWallets(@Query() data: RequestWalletDto) {
    return this.walletsService.getWallets(data)
  }

  @EventPattern('save_to_wallet')
  async handleTransactionCreated(@Payload() data: any, @Ctx() context?: RmqContext) {
    data = {
      transactionId: data.transData._id,
      trxDate: data.transData.trxDate,
      customerEmail: data.transData.customerEmail,
      customerMsisdn: data.transData.customerMsisdn,
      balance: data.transData.cashbackTotal,
    }
    const walletData = await this.walletsService.create(data)
    if (context)
      this.rmqService.ack(context)

    return new CreateWalletResponseDto(
      HttpStatus.OK,
      `Create new wallet data successfully`,
      walletData
    )
  }
}
