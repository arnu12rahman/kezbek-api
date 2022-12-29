import { RmqService } from '@app/common';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CashbacksService } from './cashbacks.service';
import { CreateCashbackDto } from './dto/create-cashback.dto';
import { RequestCashbackDto } from './dto/request-cashback.dto';
import { ResponseCashbackDto } from './dto/response-cashback.dto';
@ApiTags('Cashbacks')
@Controller('cashbacks')
export class CashbacksController {
  constructor(
    private readonly cashbacksService: CashbacksService,
    private readonly rmqService: RmqService
  ) {}
  
  @Post()
  create(@Body() createCashbackDto: CreateCashbackDto) {
    return this.cashbacksService.create(createCashbackDto);
  }

  @Get()
  @ApiOkResponse({type: ResponseCashbackDto})
  async getCashbacks(@Query() data: RequestCashbackDto){
    return this.cashbacksService.getCashbacks(data)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashbackDto: CreateCashbackDto) {
    return this.cashbacksService.update(id, updateCashbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashbacksService.remove(id);
  }

  @EventPattern('transaction_created')
  async handleTransactionCreated(@Payload() data: any, @Ctx() context: RmqContext){
    this.cashbacksService.calculateCashback(data)
    this.rmqService.ack(context)
  }
}
