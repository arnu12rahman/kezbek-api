import { PageService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { RemovePartnerDto } from './dto/request/remove-partnerdto';
import { PartnersRepository } from './partners.repository';

@Injectable()
export class PartnersService extends PageService{
  private readonly logger = new Logger(PartnersService.name)
  constructor(
    private readonly partnerRepository: PartnersRepository,
  ){super()}

  create(createPartnerDto: any) {
    return this.partnerRepository.create(createPartnerDto)
  }
  
  update(id: string, updatePartnerDto: any) {
    return this.partnerRepository.findOneAndUpdate({_id: id},updatePartnerDto)
  }

  remove(id: string, updatePartnerDto: RemovePartnerDto) {
    return this.partnerRepository.findOneAndUpdate({_id: id}, updatePartnerDto)
  }

  async getPartners(data){
    data = {...data, status: 1}
    return this.generatePage(data, this.partnerRepository)
  }

  async getPartnerDetail(data: any){
    return this.partnerRepository.findOne({partnerReferCode: data.request.partnerReferCode})
  }
}
