import { PageService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
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

  remove(id: string) {
    return this.partnerRepository.findOneAndUpdate({_id: id},{ "$set": {
      status: 0,
      isDeleted: 1
    }})
  }

  async getPartner(data){
    data = {...data, status: 1}
    return this.generatePage(data, this.partnerRepository)
  }
}
