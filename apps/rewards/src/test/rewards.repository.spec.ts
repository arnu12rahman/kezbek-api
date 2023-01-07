import { getConnectionToken, getModelToken } from "@nestjs/mongoose"
import { Test } from "@nestjs/testing"
import { FilterQuery } from "mongoose"
import { RewardsRepository } from "../repository/rewards.repository"
import { Reward } from "../schemas/reward.schema"
import { rewardStub, rewardStubArray } from "./stubs/reward.stub"
import { RewardModel } from "./support/reward.model"

describe('RewardsRepository', () => {
    let rewardsRepository: RewardsRepository
    let rewardModel: RewardModel
    let rewardFilterQuery: FilterQuery<Reward>

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                RewardsRepository, {
                    provide: getModelToken(Reward.name),
                    useClass: RewardModel,
                },
                {
                    provide: getConnectionToken(),
                    useValue: {}
                }
            ]
        }).compile()

        rewardsRepository = moduleRef.get<RewardsRepository>(RewardsRepository)
        rewardModel = moduleRef.get<RewardModel>(getModelToken(Reward.name))
        rewardFilterQuery = {
            _id: rewardStub()._id
        }
        jest.clearAllMocks()
    })

    describe('findOne', () => {
        describe('when findOne is called', () => {
            let reward: Reward

            beforeEach(async () => {
                jest.spyOn(rewardModel, 'findOne')
                reward = await rewardsRepository.findOne(rewardFilterQuery)
            })

            test('then it should call the findOne function on rewardModel', () => {
                expect(rewardModel.findOne).toHaveBeenCalledWith(rewardFilterQuery, {}, { lean: true })
            })

            test('then it should return as reward', () => {
                expect(reward).toEqual(rewardStub())
            })
        })
    })

    describe('find', () => {
        describe('when find is called', () => {
            let rewards: Reward[]

            beforeEach(async () => {
                jest.spyOn(rewardModel, 'find')
                rewards = await rewardsRepository.find(rewardFilterQuery)
            })

            test('then it should call the find function onrewardModel', () => {
                expect(rewardModel.find).toHaveBeenCalledWith(rewardFilterQuery, {}, { lean: true })
            })

            test('then it should return as rewards', () => {
                expect(rewards).toEqual(rewardStubArray())
            })
        })
    })

    describe('findOneAndUpdate', () => {
        describe('when findOneAndUpdate is called', () => {
            let reward: Reward

            beforeEach(async () => {
                jest.spyOn(rewardModel, 'findOneAndUpdate')
                reward = await rewardsRepository.findOneAndUpdate(rewardFilterQuery, rewardStub())
            })

            test('then it should call the findOneAndUpdate function on rewardModel', () => {
                expect(rewardModel.findOneAndUpdate).toHaveBeenCalledWith(rewardFilterQuery, rewardStub(), { lean: true, upsert: true, new: true })
            })

            test('then it should return as reward', () => {
                expect(reward).toEqual(rewardStub())
            })
        })
    })
})