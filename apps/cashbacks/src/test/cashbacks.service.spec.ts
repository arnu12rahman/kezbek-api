import { RmqService } from "@app/common"
import { ConfigService } from "@nestjs/config"
import { Test } from "@nestjs/testing"
import { CashbacksService } from "../cashbacks.service"
import { CreateCashbackDto } from "../dto/request/create-cashback.dto"
import { ResponseCashbackDto } from "../dto/response/response-cashback.dto"
import { cashbackCreateStub, cashbackDeleteStub, cashbackUpdateStub, findCashbackStub, responseCashbackCreateStub, responseCashbackDeleteStub, responseCashbackTrx, responseCashbackUpdateStub, transactionSub } from "./stubs/cashback.stub"

jest.mock('../cashbacks.service')

describe('CashbacksService', () => {
  let cashbacksService: CashbacksService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [CashbacksService, RmqService, ConfigService]
    }).compile();

    cashbacksService = moduleRef.get<CashbacksService>(CashbacksService);
    jest.clearAllMocks();
  })

  describe('create', () => {
    describe('when create service is called', () => {
      let cashbackData: CreateCashbackDto

      beforeEach(async () => {
        cashbackData = await cashbacksService.create(cashbackCreateStub())
      })

      test('then is should return a new cashback data', async () => {
        expect(cashbackData).toEqual(cashbackCreateStub())
      })
    })
  })

  describe('update', () => {
    describe('when update service is called', () => {
      let cashbackData: CreateCashbackDto

      beforeEach(async () => {
        cashbackData = await cashbacksService.update('63b661bbf111cd23e52fdc6a',cashbackUpdateStub())
      })

      test('then is should return a updated cashback data', async () => {
        expect(cashbackData).toEqual(cashbackUpdateStub())
      })
    })
  })

  describe('remove', () => {
    describe('when remove service is called', () => {
      let cashbackData: CreateCashbackDto

      beforeEach(async () => {
        cashbackData = await cashbacksService.remove('63b661bbf111cd23e52fdc6a')
      })

      test('then is should return a deleted cashback data', async () => {
        expect(cashbackData).toEqual(cashbackDeleteStub())
      })
    })
  })

  describe('getCashbacks', () => {
    describe('when getCashbacks service is called', () => {
      let responseCashback: ResponseCashbackDto
      let requestCashback: any

      beforeEach(async () => {
        requestCashback = {
          page: 1,
          limit: 1,
          cashbackReferCode: "kez07bek",
          status: 1
        }
        responseCashback = await cashbacksService.getCashbacks(requestCashback)
      })

      test('then is should return a cashback data', async () => {
        expect(responseCashback).toEqual(findCashbackStub())
      })
    })
  })

  describe('calculateCashback',() => {
    describe('when calculateCashback service is called', () => {
      let cashbackTrx: number 
      
      beforeEach(async () => {
        cashbackTrx = await cashbacksService.calculateCashback(transactionSub())
      })

      test('then is should return a cashback trx value', async () => {
        expect(cashbackTrx).toEqual(responseCashbackTrx)
      })
    })
  })
})