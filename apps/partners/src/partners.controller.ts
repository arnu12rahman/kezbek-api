import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PartnerDto } from './dto/partner.dto';
import { RequestPartnerDto } from './dto/request-partner.dto';
import { ResponsePartnerDto } from './dto/response-partner.dto';
import { PartnersService } from './partners.service';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  create(@Body() createPartnerDto: PartnerDto) {
    return this.partnersService.create(createPartnerDto);
  }

  @Get()
  @ApiOkResponse({type: ResponsePartnerDto})
  async getRewards(@Query() data: RequestPartnerDto){
    return this.partnersService.getPartner(data)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerDto: PartnerDto) {
    return this.partnersService.update(id, updatePartnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnersService.remove(id);
  }
}
