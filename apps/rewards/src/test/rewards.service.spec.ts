import { RmqService } from "@app/common"
import { ConfigService } from "@nestjs/config"
import { Test } from "@nestjs/testing"
import { CreateRewardDto } from "../dto/reward/request/create-reward.dto"
import { RemoveRewardDto } from "../dto/reward/request/remove-rewarddto"
import { ResponseRewardDto } from "../dto/reward/response/response-reward.dto"
import { RewardsService } from "../rewards.service"
import { rewardCreateStub, rewardDeleteStub, rewardUpdateStub, findRewardStub, responseCashbackReward, transactionSub } from "./stubs/reward.stub"

jest.mock('../rewards.service')

describe('RewardsService', () => {
  let rewardsService: RewardsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [RewardsService, RmqService, ConfigService]
    }).compile();

    rewardsService = moduleRef.get<RewardsService>(RewardsService);
    jest.clearAllMocks();
  })

  describe('create', () => {
    describe('when create service is called', () => {
      let rewardData: CreateRewardDto

      beforeEach(async () => {
        rewardData = await rewardsService.create(rewardCreateStub())
      })

      test('then is should return a new reward data', async () => {
        expect(rewardData).toEqual(rewardCreateStub())
      })
    })
  })

  describe('update', () => {
    describe('when update service is called', () => {
      let rewardData: CreateRewardDto

      beforeEach(async () => {
        rewardData = await rewardsService.update('63b661bbf111cd23e52fdc6a',rewardUpdateStub())
      })

      test('then is should return a updated reward data', async () => {
        expect(rewardData).toEqual(rewardUpdateStub())
      })
    })
  })

  describe('remove', () => {
    describe('when remove service is called', () => {
      let rewardData: CreateRewardDto
      let updateRewardDto = new RemoveRewardDto
      updateRewardDto.status = 0
      updateRewardDto.isDeleted = 1
      beforeEach(async () => {
        rewardData = await rewardsService.remove('63b661bbf111cd23e52fdc6a',updateRewardDto)
      })

      test('then is should return a deleted reward data', async () => {
        expect(rewardData).toEqual(rewardDeleteStub())
      })
    })
  })

  describe('getRewards', () => {
    describe('when getRewards service is called', () => {
      let responseReward: ResponseRewardDto
      let requestReward: any

      beforeEach(async () => {
        requestReward = {
          page: 1,
          limit: 1,
          tier: "gold",
          status: 1
        }
        responseReward = await rewardsService.getRewards(requestReward)
      })

      test('then is should return a reward data', async () => {
        expect(responseReward).toEqual(findRewardStub())
      })
    })
  })

  describe('calculateReward',() => {
    describe('when calculateReward service is called', () => {
      let rewardTrx: number 
      
      beforeEach(async () => {
        rewardTrx = await rewardsService.calculateReward(transactionSub())
      })

      test('then is should return a reward trx value', async () => {
        expect(rewardTrx).toEqual(responseCashbackReward)
      })
    })
  })
})