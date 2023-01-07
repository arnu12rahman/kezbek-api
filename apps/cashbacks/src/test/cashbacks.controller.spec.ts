import { JwtAuthGuard, RmqService } from "@app/common"
import { AUTH_SERVICE } from "@app/common/auth/services"
import { UsersService } from "../../../auth/src/users/users.service"
import { ConfigService } from "@nestjs/config"
import { Test } from "@nestjs/testing"
import { CashbacksController } from "../cashbacks.controller"
import { CashbacksService } from "../cashbacks.service"
import { RequestCashbackDto } from "../dto/request/request-cashback.dto"
import { CreateCachbackResponseDto } from "../dto/response/create-cashback.response.dto"
import { ResponseCashbackDto } from "../dto/response/response-cashback.dto"
import { cashbackCreateStub, cashbackUpdateStub, findCashbackStub, responseCashbackCreateStub, responseCashbackDeleteStub, responseCashbackTrx, responseCashbackUpdateStub, transactionSub } from "./stubs/cashback.stub"
import { RemoveCashbackDto } from "../dto/request/remove-cashback.dto"

jest.mock('../cashbacks.service')

describe('CashbacksController', () => {
  let cashbacksController: CashbacksController;
  let cashbacksService: CashbacksService;
  const mockUserService = {}

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [CashbacksController],
      providers: [CashbacksService, RmqService, ConfigService,
        { provide: UsersService, useValue: mockUserService },
        { provide: JwtAuthGuard, useValue: jest.fn().mockImplementation(() => true) },
        { provide: AUTH_SERVICE, useValue: 'AUTH' }]
    }).compile();

    cashbacksController = moduleRef.get<CashbacksController>(CashbacksController);
    cashbacksService = moduleRef.get<CashbacksService>(CashbacksService);
    jest.clearAllMocks();
  })

  describe('create', () => {
    describe('when create is called', () => {
      let cashbackData: CreateCachbackResponseDto

      beforeEach(async () => {
        cashbackData = await cashbacksController.create(cashbackCreateStub())
      })

      test('then it should call create from cashbacksService', () => {
        expect(cashbacksService.create).toBeCalledWith(cashbackCreateStub())
      })

      test('then is should return a new cashback data', async () => {
        expect(cashbackData).toEqual(responseCashbackCreateStub)
      })
    })
  })

  describe('update', () => {
    describe('when update is called', () => {
      let cashbackData: CreateCachbackResponseDto

      beforeEach(async () => {
        cashbackData = await cashbacksController.update('63b661bbf111cd23e52fdc6a', cashbackUpdateStub())
      })

      test('then it should call update from cashbacksService', () => {
        expect(cashbacksService.update).toBeCalledWith('63b661bbf111cd23e52fdc6a', cashbackUpdateStub())
      })

      test('then is should return a cashback data', async () => {
        expect(cashbackData).toEqual(responseCashbackUpdateStub)
      })
    })
  })

  describe('remove', () => {
    describe('when remove is called', () => {
      let cashbackData: CreateCachbackResponseDto
      let updateCashbackDto = new RemoveCashbackDto
      updateCashbackDto.status = 0
      updateCashbackDto.isDeleted = 1
      beforeEach(async () => {
        cashbackData = await cashbacksController.remove('63b661bbf111cd23e52fdc6a')
      })

      test('then it should call update from cashbacksService', () => {
        expect(cashbacksService.remove).toBeCalledWith('63b661bbf111cd23e52fdc6a',updateCashbackDto)
      })

      test('then is should return a cashback data', async () => {
        expect(cashbackData).toEqual(responseCashbackDeleteStub)
      })
    })
  })

  describe('getCashbacks', () => {
    describe('when getCashbacks is called', () => {
      let responseCashback: ResponseCashbackDto
      let requestCashback: RequestCashbackDto

      beforeEach(async () => {
        requestCashback = {
          page: 1,
          limit: 1,
          cashbackReferCode: "kez07bek"
        }
        responseCashback = await cashbacksController.getCashbacks(requestCashback)
      })

      test('then it should call update from cashbacksService', () => {
        expect(cashbacksService.getCashbacks).toBeCalledWith(requestCashback)
      })

      test('then is should return a cashback data', async () => {
        expect(responseCashback).toEqual(findCashbackStub())
      })
    })
  })

  describe('handleTransactionCreated', () => {
    describe('when handleTransactionCreated is called', () => {
      let cashbackTrx: number

      beforeEach(async () => {
        cashbackTrx = await cashbacksController.handleTransactionCreated(transactionSub())
      })

      test('then it should call calculateCashback from cashbacksService', () => {
        expect(cashbacksService.calculateCashback).toBeCalledWith(transactionSub())
      })

      test('then is should return a cashback trx value', async () => {
        expect(cashbackTrx).toEqual(responseCashbackTrx)
      })
    })
  })
})