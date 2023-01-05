import { RmqService } from "@app/common"
import { ConfigService } from "@nestjs/config"
import { Test } from "@nestjs/testing"
import { RequestPartnerDto } from "../dto/request/request-partner.dto"
import { CreatePartnerResponseDto } from "../dto/response/create-partnerresponse.dto"
import { ResponsePartnerDto } from "../dto/response/response-partner.dto"
import { PartnersController } from "../partners.controller"
import { PartnersService } from "../partners.service"
import { partnerCreateStub, partnerUpdateStub, findPartnerStub, responsePartnerCreateStub, responsePartnerDeleteStub,  responsePartnerUpdateStub } from "./stubs/partner.stub"

jest.mock('../partners.service')

describe('PartnersController', () => {
  let partnersController: PartnersController;
  let partnersService: PartnersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [PartnersController],
      providers: [PartnersService, RmqService, ConfigService]
    }).compile();

    partnersController = moduleRef.get<PartnersController>(PartnersController);
    partnersService = moduleRef.get<PartnersService>(PartnersService);
    jest.clearAllMocks();
  })

  describe('create', () => {
    describe('when create is called', () => {
      let partnerData: CreatePartnerResponseDto

      beforeEach(async () => {
        partnerData = await partnersController.create(partnerCreateStub())
      })

      test('then it should call create from partnersService', () => {
        expect(partnersService.create).toBeCalledWith(partnerCreateStub())
      })

      test('then is should return a new partner data', async () => {
        expect(partnerData).toEqual(responsePartnerCreateStub)
      })
    })
  })

  describe('update', () => {
    describe('when update is called', () => {
      let partnerData: CreatePartnerResponseDto

      beforeEach(async () => {
        partnerData = await partnersController.update('63b661bbf111cd23e52fdc6a',partnerUpdateStub())
      })

      test('then it should call update from partnersService', () => {
        expect(partnersService.update).toBeCalledWith('63b661bbf111cd23e52fdc6a',partnerUpdateStub())
      })

      test('then is should return a partner data', async () => {
        expect(partnerData).toEqual(responsePartnerUpdateStub)
      })
    })
  })

  describe('remove', () => {
    describe('when remove is called', () => {
      let partnerData: CreatePartnerResponseDto

      beforeEach(async () => {
        partnerData = await partnersController.remove('63b661bbf111cd23e52fdc6a')
      })

      test('then it should call update from partnersService', () => {
        expect(partnersService.remove).toBeCalledWith('63b661bbf111cd23e52fdc6a')
      })

      test('then is should return a partner data', async () => {
        expect(partnerData).toEqual(responsePartnerDeleteStub)
      })
    })
  })

  describe('getPartners', () => {
    describe('when getPartners is called', () => {
      let responsePartner: ResponsePartnerDto
      let requestPartner: RequestPartnerDto

      beforeEach(async () => {
        requestPartner = {
          page: 1,
          limit: 1,
          partnerName: "ShopeeShop",
          partnerEmail: "Shopee@gmail.com",
          partnerMsisdn: "+628111379309"
        }
        responsePartner = await partnersController.getPartners(requestPartner)
      })

      test('then it should call update from partnersService', () => {
        expect(partnersService.getPartners).toBeCalledWith(requestPartner)
      })

      test('then is should return a partner data', async () => {
        expect(responsePartner).toEqual(findPartnerStub())
      })
    })
  })
})