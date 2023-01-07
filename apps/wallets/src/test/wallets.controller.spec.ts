import { JwtAuthGuard, RmqService } from "@app/common"
import { AUTH_SERVICE } from "@app/common/auth/services"
import { UsersService } from "../../../auth/src/users/users.service"
import { ConfigService } from "@nestjs/config"
import { Test } from "@nestjs/testing"
import { WalletsController } from "../wallets.controller"
import { WalletsService } from "../wallets.service"
import { findWalletStub, responseWalletCreateStub, walletDataSubmit } from "../test/stubs/wallet.stub";
import { CreateWalletResponseDto } from "../dto/response/create-wallet.response.dto"
import { ResponseWalletDto } from "../dto/response/response-wallet.dto"
import { RequestWalletDto } from "../dto/request/request-wallet.dto"

jest.mock('../wallets.service')

describe('WalletsController', () => {
  let walletsController: WalletsController;
  let walletsService: WalletsService;
  const mockUserService = {}

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [WalletsController],
      providers: [WalletsService, RmqService, ConfigService,
        { provide: UsersService, useValue: mockUserService },
        { provide: JwtAuthGuard, useValue: jest.fn().mockImplementation(() => true) },
        { provide: AUTH_SERVICE, useValue: 'AUTH' }]
    }).compile();

    walletsController = moduleRef.get<WalletsController>(WalletsController);
    walletsService = moduleRef.get<WalletsService>(WalletsService);
    jest.clearAllMocks();
  })

  describe('handleTransactionCreated', () => {
    describe('when handleTransactionCreated is called', () => {
      let walletData: CreateWalletResponseDto
      let data

      beforeEach(async () => {
        data = {
          transData: {
            _id: "63b512c9b315e8427c643118",
            trxDate: "2022-12-12",
            customerEmail: "arstrois@gmail.com",
            customerMsisdn: "+628111379309",
            cashbackTotal: 38000
          }
        }
        walletData = await walletsController.handleTransactionCreated(data)
      })

      test('then it should call create wallet from walletsService', () => {
        expect(walletsService.create).toBeCalledWith(walletDataSubmit())
      })

      test('then is should return a wallet data', async () => {
        expect(walletData).toEqual(responseWalletCreateStub)
      })
    })
  })

  describe('getWallets', () => {
    describe('when getWallets is called', () => {
      let responseWallet: ResponseWalletDto
      let requestWallet: RequestWalletDto

      beforeEach(async () => {
        requestWallet = {
          page: 1,
          limit: 1,
          customerEmail: "arstrois@gmail.com"
        }
        responseWallet = await walletsController.getWallets(requestWallet)
      })

      test('then it should call update from walletsService', () => {
        expect(walletsService.getWallets).toBeCalledWith(requestWallet)
      })

      test('then is should return a wallet data', async () => {
        expect(responseWallet).toEqual(findWalletStub())
      })
    })
  })
})