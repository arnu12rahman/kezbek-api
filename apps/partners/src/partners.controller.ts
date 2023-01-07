import { JwtAuthGuard, RmqService } from '@app/common';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PartnerDto } from './dto/core/partner.dto';
import { RemovePartnerDto } from './dto/request/remove-partnerdto';
import { RequestPartnerDto } from './dto/request/request-partner.dto';
import { CreatePartnerResponseDto } from './dto/response/create-partnerresponse.dto';
import { ResponseBadRequestDto } from './dto/response/response-bad-request.dto';
import { ResponsePartnerDto } from './dto/response/response-partner.dto';
import { ResponseServerErrorDto } from './dto/response/response-server-error.dto';
import { PartnersService } from './partners.service';

@ApiTags('Partners')
@Controller('partners')
@UseGuards(JwtAuthGuard)
export class PartnersController {
  constructor(private readonly partnersService: PartnersService,  private readonly rmqService: RmqService) {}

  @Post()
  @ApiOkResponse({type: CreatePartnerResponseDto})
  @ApiBadRequestResponse({type: ResponseBadRequestDto})
  @ApiInternalServerErrorResponse({type: ResponseServerErrorDto})
  async create(@Body() createPartnerDto: PartnerDto) {
    const partnerData = await this.partnersService.create(createPartnerDto);

    return new CreatePartnerResponseDto(
      HttpStatus.OK,
      `Create new partner data successfully`,
      partnerData
    )
  }

  @Get()
  @ApiOkResponse({type: ResponsePartnerDto})
  async getPartners(@Query() data: RequestPartnerDto){
    return this.partnersService.getPartners(data)
  }

  @Patch(':id')
  @ApiOkResponse({type: CreatePartnerResponseDto})
  @ApiBadRequestResponse({type: ResponseBadRequestDto})
  @ApiInternalServerErrorResponse({type: ResponseServerErrorDto})
  async update(@Param('id') id: string, @Body() updatePartnerDto: PartnerDto) {
    const partnerData = await this.partnersService.update(id, updatePartnerDto);

    return new CreatePartnerResponseDto(
      HttpStatus.OK,
      `partner data success updated`,
      partnerData
    )
  }

  @Delete(':id')
  @ApiOkResponse({type: CreatePartnerResponseDto})
  @ApiBadRequestResponse({type: ResponseBadRequestDto})
  @ApiInternalServerErrorResponse({type: ResponseServerErrorDto})
  async remove(@Param('id') id: string) {
    let updatePartnerDto = new RemovePartnerDto
    updatePartnerDto.status = 0
    updatePartnerDto.isDeleted = 1
    const partnerData = await this.partnersService.remove(id,updatePartnerDto);

    return new CreatePartnerResponseDto(
      HttpStatus.OK,
      `partner data success deleted`,
      partnerData
    )
  }

  @MessagePattern('get_partner_detail')
  async handleTransactionCreated(@Payload() data: any, @Ctx() context?: RmqContext){
    const partnerData = await this.partnersService.getPartnerDetail(data)
    if(context)
      this.rmqService.ack(context)

    return partnerData
  }
}
