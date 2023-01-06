import { RmqService } from "@app/common"
import { ConfigService } from "@nestjs/config"
import { Test } from "@nestjs/testing"
import { WalletsService } from "../wallets.service"
import { findWalletStub, walletStub, responseWalletCreateStub, walletCreateStub } from "../test/stubs/wallet.stub";
import { ResponseWalletDto } from "../dto/response/response-wallet.dto";
import { RequestWalletDto } from "../dto/request/request-wallet.dto";
import { CreateWalletResponseDto } from "../dto/response/create-wallet.response.dto";
import { WalletDto } from "../dto/core/wallet.dto";
import { CreateWalletDto } from "../dto/request/create-wallet.dto";

jest.mock('../wallets.service')

describe('WalletsService', () => {
  let walletsService: WalletsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [WalletsService, RmqService, ConfigService]
    }).compile();

    walletsService = moduleRef.get<WalletsService>(WalletsService);
    jest.clearAllMocks();
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
        responseWallet = await walletsService.getWallets(requestWallet)
      })

      test('then is should return a wallet data', async () => {
        expect(responseWallet).toEqual(findWalletStub())
      })
    })
  })

  describe('crete',() => {
    describe('when create is called', () => {
      let walletData: CreateWalletDto 
      
      beforeEach(async () => {
        walletData = await walletsService.create(walletStub())
      })

      test('then is should return a wallet data', async () => {
        expect(walletData).toEqual(walletCreateStub())
      })
    })
  })
})