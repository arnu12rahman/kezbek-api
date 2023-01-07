import { getConnectionToken, getModelToken } from "@nestjs/mongoose"
import { Test } from "@nestjs/testing"
import { Transaction } from "../../../transactions/src/schemas/transaction.schema"
import { TransactionModel } from "../../../transactions/src/test/support/transaction.model"
import { TransactionsRepository } from "../../../transactions/src/transactions.repository"
import { TiersRepository } from "../repository/tiers.repository"
import { Tier } from "../schemas/tier.schema"
import { TierService } from "../service/tier.service"
import { responseUpdateTier, tierStub, transStub, transStubData } from "./stubs/tier.stub"
import { TierModel } from "./support/tier.model"

jest.mock('../__mocks__/tier.service')

describe('TierService', () => {
  let tierService: TierService;
  let tierRepository: TiersRepository
  let transRepository: TransactionsRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [
        TiersRepository,
        {
          provide: getModelToken(Tier.name),
          useClass: TierModel,
        },
        {
          provide: getConnectionToken(),
          useValue: {}
        },
        TransactionsRepository,
        {
          provide: getModelToken(Transaction.name),
          useClass: TransactionModel,
        },
        {
          provide: getConnectionToken(),
          useValue: {}
        },
        TierService
      ]
    }).compile();

    transRepository = moduleRef.get<TransactionsRepository>(TransactionsRepository)
    tierRepository = moduleRef.get<TiersRepository>(TiersRepository)
    tierService = moduleRef.get<TierService>(TierService);
    jest.clearAllMocks();
  })

  describe('trxThisMonth', () => {
    describe('when trxThisMonth service is called', () => {
      let transData

      beforeEach(async () => {
        transData = await tierService.trxThisMonth(transStubData(), transRepository)
      })

      test('then is should return a last month transaction data or null', async () => {
        expect(transData).toEqual(transStub())
      })
    })
  })

  describe('getTierData', () => {
    describe('when getTierData service is called', () => {
      let tierData

      beforeEach(async () => {
        tierData = await tierService.getTierData(transStubData(), tierRepository)
      })

      test('then is should return a tier data', async () => {
        expect(tierData).toEqual(tierStub())
      })
    })
  })

  describe('downgradeTierCat', () => {
    describe('when downgradeTierCat service is called', () => {
      let tierData

      beforeEach(() => {
        tierData = tierService.downgradeTierCat('bronze')
      })

      test('then is should return a tier data', async () => {
        expect(tierData).toEqual('bronze')
      })
    })
  })

  describe('upgradeTierCat', () => {
    describe('when upgradeTierCat service is called', () => {
      let tierData

      beforeEach(() => {
        tierData = tierService.upgradeTierCat('gold','gold',7)
      })

      test('then is should return a tier data', async () => {
        expect(tierData).toEqual(responseUpdateTier())
      })
    })
  })
})