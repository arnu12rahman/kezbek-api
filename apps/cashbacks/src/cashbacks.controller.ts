import { JwtAuthGuard, RmqService } from '@app/common';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CashbacksService } from './cashbacks.service';
import { CreateCashbackDto } from './dto/request/create-cashback.dto';
import { RequestCashbackDto } from './dto/request/request-cashback.dto';
import { CreateCachbackResponseDto } from './dto/response/create-cashback.response.dto';
import { ResponseBadRequestDto } from './dto/response/response-bad-request.dto';
import { ResponseCashbackDto } from './dto/response/response-cashback.dto';
import { ResponseServerErrorDto } from './dto/response/response-server-error.dto';
@ApiTags('Cashbacks')
@UseGuards(JwtAuthGuard)
@Controller('cashbacks')
export class CashbacksController {
  constructor(
    private readonly cashbacksService: CashbacksService,
    private readonly rmqService: RmqService
  ) {}
  
  @Post()
  @ApiOkResponse({type: CreateCachbackResponseDto})
  @ApiBadRequestResponse({type: ResponseBadRequestDto})
  @ApiInternalServerErrorResponse({type: ResponseServerErrorDto})
  async create(@Body() createCashbackDto: CreateCashbackDto) {
    const cashbackData = await this.cashbacksService.create(createCashbackDto);

    return new CreateCachbackResponseDto(
      HttpStatus.OK,
      `Create new cashback data successfully`,
      cashbackData
    )
  }

  @Get()
  @ApiOkResponse({type: ResponseCashbackDto})
  async getCashbacks(@Query() data: RequestCashbackDto){
    return this.cashbacksService.getCashbacks(data)
  }

  @Patch(':id')
  @ApiOkResponse({type: CreateCachbackResponseDto})
  @ApiBadRequestResponse({type: ResponseBadRequestDto})
  @ApiInternalServerErrorResponse({type: ResponseServerErrorDto})
  async update(@Param('id') id: string, @Body() updateCashbackDto: CreateCashbackDto) {
    const cashbackData = await this.cashbacksService.update(id, updateCashbackDto);

    return new CreateCachbackResponseDto(
      HttpStatus.OK,
      `cashback data success updated`,
      cashbackData
    )
  }

  @Delete(':id')
  @ApiOkResponse({type: CreateCachbackResponseDto})
  @ApiBadRequestResponse({type: ResponseBadRequestDto})
  @ApiInternalServerErrorResponse({type: ResponseServerErrorDto})
  async remove(@Param('id') id: string) {
    const cashbackData = await this.cashbacksService.remove(id);

    return new CreateCachbackResponseDto(
      HttpStatus.OK,
      `cashback data success deleted`,
      cashbackData
    )
  }

  @MessagePattern('calculate_cashback')
  async handleTransactionCreated(@Payload() data: any, @Ctx() context?: RmqContext){
    const cashbackTrx = await this.cashbacksService.calculateCashback(data)
    if(context)
      this.rmqService.ack(context)

    return cashbackTrx
  }
}
