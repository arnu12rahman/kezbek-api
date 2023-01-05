import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PartnerDto } from './dto/core/partner.dto';
import { RequestPartnerDto } from './dto/request/request-partner.dto';
import { CreatePartnerResponseDto } from './dto/response/create-partnerresponse.dto';
import { ResponseBadRequestDto } from './dto/response/response-bad-request.dto';
import { ResponsePartnerDto } from './dto/response/response-partner.dto';
import { ResponseServerErrorDto } from './dto/response/response-server-error.dto';
import { PartnersService } from './partners.service';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

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
    const partnerData = await this.partnersService.remove(id);

    return new CreatePartnerResponseDto(
      HttpStatus.OK,
      `partner data success deleted`,
      partnerData
    )
  }
}
