import { JwtAuthGuard } from '@app/common';
import { Body, Controller, Get, Post, Req, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { RequestTransactionDto } from './dto/request-transaction.dto';
import { ResponseTransactionDto } from './dto/response-transaction.dto';
import { TransactionsService } from './transactions.service';
@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async createTransaction(@Body() request: CreateTransactionDto, @Req() req: any){
    return this.transactionsService.createTransaction(request, req.cookies?.Authentication)
  }

  @Get()
  @ApiOkResponse({type: ResponseTransactionDto})
  async getTransactions(@Query() data: RequestTransactionDto){
    return this.transactionsService.getTransactions(data)
  }
}
