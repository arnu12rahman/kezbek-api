import { RmqService } from "@app/common"
import { ConfigService } from "@nestjs/config"
import { Test } from "@nestjs/testing"
import { RequestRewardDto } from "../dto/reward/request/request-reward.dto"
import { CreateRewardResponseDto } from "../dto/reward/response/create-reward.response.dto"
import { ResponseRewardDto } from "../dto/reward/response/response-reward.dto"
import { RewardsController } from "../rewards.controller"
import { RewardsService } from "../rewards.service"
import { rewardCreateStub, rewardUpdateStub, findRewardStub, responseRewardCreateStub, responseRewardDeleteStub, responseCashbackReward, responseRewardUpdateStub, transactionSub } from "./stubs/reward.stub"

jest.mock('../rewards.service')

describe('RewardsController', () => {
  let rewardsController: RewardsController;
  let rewardsService: RewardsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [RewardsController],
      providers: [RewardsService, RmqService, ConfigService]
    }).compile();

    rewardsController = moduleRef.get<RewardsController>(RewardsController);
    rewardsService = moduleRef.get<RewardsService>(RewardsService);
    jest.clearAllMocks();
  })

  describe('create', () => {
    describe('when create is called', () => {
      let rewardData: CreateRewardResponseDto

      beforeEach(async () => {
        rewardData = await rewardsController.create(rewardCreateStub())
      })

      test('then it should call create from rewardsService', () => {
        expect(rewardsService.create).toBeCalledWith(rewardCreateStub())
      })

      test('then is should return a new reward data', async () => {
        expect(rewardData).toEqual(responseRewardCreateStub)
      })
    })
  })

  describe('update', () => {
    describe('when update is called', () => {
      let rewardData: CreateRewardResponseDto

      beforeEach(async () => {
        rewardData = await rewardsController.update('63b661bbf111cd23e52fdc6a',rewardUpdateStub())
      })

      test('then it should call update from rewardsService', () => {
        expect(rewardsService.update).toBeCalledWith('63b661bbf111cd23e52fdc6a',rewardUpdateStub())
      })

      test('then is should return a reward data', async () => {
        expect(rewardData).toEqual(responseRewardUpdateStub)
      })
    })
  })

  describe('remove', () => {
    describe('when remove is called', () => {
      let rewardData: CreateRewardResponseDto

      beforeEach(async () => {
        rewardData = await rewardsController.remove('63b661bbf111cd23e52fdc6a')
      })

      test('then it should call update from rewardsService', () => {
        expect(rewardsService.remove).toBeCalledWith('63b661bbf111cd23e52fdc6a')
      })

      test('then is should return a reward data', async () => {
        expect(rewardData).toEqual(responseRewardDeleteStub)
      })
    })
  })

  describe('getRewards', () => {
    describe('when getRewards is called', () => {
      let responseReward: ResponseRewardDto
      let requestReward: RequestRewardDto

      beforeEach(async () => {
        requestReward = {
          page: 1,
          limit: 1,
          tier: "gold"
        }
        responseReward = await rewardsController.getRewards(requestReward)
      })

      test('then it should call update from rewardsService', () => {
        expect(rewardsService.getRewards).toBeCalledWith(requestReward)
      })

      test('then is should return a reward data', async () => {
        expect(responseReward).toEqual(findRewardStub())
      })
    })
  })

  describe('handleTransactionCreated',() => {
    describe('when handleTransactionCreated is called', () => {
      let rewardTrx: number 
      
      beforeEach(async () => {
        rewardTrx = await rewardsController.handleTransactionCreated(transactionSub())
      })

      test('then it should call calculateReward from rewardsService', () => {
        expect(rewardsService.calculateReward).toBeCalledWith(transactionSub())
      })

      test('then is should return a reward trx value', async () => {
        expect(rewardTrx).toEqual(responseCashbackReward)
      })
    })
  })
})