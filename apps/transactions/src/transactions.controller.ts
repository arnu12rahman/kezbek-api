import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { RequestTransactionDto } from './dto/request-transaction.dto';
import { ResponseTransactionDto } from './dto/response-transaction.dto';
import { TransactionsService } from './transactions.service';
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async createTransaction(@Body() request: CreateTransactionDto){
    return this.transactionsService.createTransaction(request)
  }

  @Get()
  @ApiOkResponse({type: ResponseTransactionDto})
  async getTransactions(@Query() data: RequestTransactionDto){
    return this.transactionsService.getTransactions(data)
  }
}
