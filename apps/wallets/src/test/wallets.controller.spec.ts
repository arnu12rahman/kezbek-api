import { RmqService } from "@app/common"
import { ConfigService } from "@nestjs/config"
import { Test } from "@nestjs/testing"
import { WalletsController } from "../wallets.controller"
import { WalletsService } from "../wallets.service"
import { findWalletStub, walletStub, responseWalletCreateStub } from "../test/stubs/wallet.stub";
import { CreateWalletResponseDto } from "../dto/response/create-wallet.response.dto"
import { ResponseWalletDto } from "../dto/response/response-wallet.dto"
import { RequestWalletDto } from "../dto/request/request-wallet.dto"

jest.mock('../wallets.service')

describe('WalletsController', () => {
  let walletsController: WalletsController;
  let walletsService: WalletsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [WalletsController],
      providers: [WalletsService, RmqService, ConfigService]
    }).compile();

    walletsController = moduleRef.get<WalletsController>(WalletsController);
    walletsService = moduleRef.get<WalletsService>(WalletsService);
    jest.clearAllMocks();
  })

  describe('handleTransactionCreated',() => {
    describe('when handleTransactionCreated is called', () => {
      let walletData: CreateWalletResponseDto 
      
      beforeEach(async () => {
        walletData = await walletsController.handleTransactionCreated(walletStub())
      })

      test('then it should call create wallet from walletsService', () => {
        expect(walletsService.create).toBeCalledWith(walletStub())
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