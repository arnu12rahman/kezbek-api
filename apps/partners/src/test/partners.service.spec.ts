import { RmqService } from "@app/common"
import { ConfigService } from "@nestjs/config"
import { Test } from "@nestjs/testing"
import { PartnerDto } from "../dto/core/partner.dto"
import { CreatePartnerDto } from "../dto/request/create-partner.dto"
import { RemovePartnerDto } from "../dto/request/remove-partnerdto"
import { ResponsePartnerDto } from "../dto/response/response-partner.dto"
import { PartnersService } from "../partners.service"
import { partnerCreateStub, partnerDeleteStub, partnerUpdateStub, findPartnerStub, responsePartnerCreateStub, responsePartnerDeleteStub, responsePartnerUpdateStub, transactionSub, partnerStub } from "./stubs/partner.stub"

jest.mock('../partners.service')

describe('PartnersService', () => {
  let partnersService: PartnersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [PartnersService, RmqService, ConfigService]
    }).compile();

    partnersService = moduleRef.get<PartnersService>(PartnersService);
    jest.clearAllMocks();
  })

  describe('create', () => {
    describe('when create service is called', () => {
      let partnerData: CreatePartnerDto

      beforeEach(async () => {
        partnerData = await partnersService.create(partnerCreateStub())
      })

      test('then is should return a new partner data', async () => {
        expect(partnerData).toEqual(partnerCreateStub())
      })
    })
  })

  describe('update', () => {
    describe('when update service is called', () => {
      let partnerData: CreatePartnerDto

      beforeEach(async () => {
        partnerData = await partnersService.update('63b661bbf111cd23e52fdc6a', partnerUpdateStub())
      })

      test('then is should return a updated partner data', async () => {
        expect(partnerData).toEqual(partnerUpdateStub())
      })
    })
  })

  describe('remove', () => {
    describe('when remove service is called', () => {
      let partnerData: CreatePartnerDto
      let updatePartnerDto = new RemovePartnerDto
      updatePartnerDto.status = 0
      updatePartnerDto.isDeleted = 1
      beforeEach(async () => {
        partnerData = await partnersService.remove('63b661bbf111cd23e52fdc6a',updatePartnerDto)
      })

      test('then is should return a deleted partner data', async () => {
        expect(partnerData).toEqual(partnerDeleteStub())
      })
    })
  })

  describe('getPartners', () => {
    describe('when getPartners service is called', () => {
      let responsePartner: ResponsePartnerDto
      let requestPartner: any

      beforeEach(async () => {
        requestPartner = {
          page: 1,
          limit: 1,
          tier: "gold",
          status: 1
        }
        responsePartner = await partnersService.getPartners(requestPartner)
      })

      test('then is should return a partner data', async () => {
        expect(responsePartner).toEqual(findPartnerStub())
      })
    })
  })

  describe('getPartnerDetail', () => {
    describe('when getPartnerDetail service is called', () => {
      let partnerData: PartnerDto

      beforeEach(async () => {
        partnerData = await partnersService.getPartnerDetail(transactionSub())
      })

      test('then is should return a cashback trx value', async () => {
        expect(partnerData).toEqual(partnerStub())
      })
    })
  })
})