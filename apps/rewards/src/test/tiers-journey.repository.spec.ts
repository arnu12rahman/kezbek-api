import { getConnectionToken, getModelToken } from "@nestjs/mongoose"
import { Test } from "@nestjs/testing"
import { FilterQuery } from "mongoose"
import { TiersJourneyRepository } from "../repository/tiers-journey.repository"
import { TierJournery } from "../schemas/tier-journey.schema"
import { tierJourneyStub } from "./stubs/tier-journey.stub"
import { TierJourneryModel } from "./support/tier-journery.model"

describe('TiersJourneyRepository', () => {
    let tiersJourneyRepository: TiersJourneyRepository
    let tierJourneyModel: TierJourneryModel
    let tierJournyFilterQuery: FilterQuery<TierJournery>

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                TiersJourneyRepository, {
                    provide: getModelToken(TierJournery.name),
                    useClass: TierJourneryModel,
                },
                {
                    provide: getConnectionToken(),
                    useValue: {}
                }
            ]
        }).compile()

        tiersJourneyRepository = moduleRef.get<TiersJourneyRepository>(TiersJourneyRepository)
        tierJourneyModel = moduleRef.get<TierJourneryModel>(getModelToken(TierJournery.name))
        tierJournyFilterQuery = {
            _id: tierJourneyStub()._id
        }
        jest.clearAllMocks()
    })

    describe('findOne', () => {
        describe('when findOne is called', () => {
            let reward: TierJournery

            beforeEach(async () => {
                jest.spyOn(tierJourneyModel, 'findOne')
                reward = await tiersJourneyRepository.findOne(tierJournyFilterQuery)
            })

            test('then it should call the findOne function on tierJourneyModel', () => {
                expect(tierJourneyModel.findOne).toHaveBeenCalledWith(tierJournyFilterQuery, {}, { lean: true })
            })

            test('then it should return as tier journey', () => {
                expect(reward).toEqual(tierJourneyStub())
            })
        })
    })

    describe('findOneAndUpdate', () => {
        describe('when findOneAndUpdate is called', () => {
            let reward: TierJournery

            beforeEach(async () => {
                jest.spyOn(tierJourneyModel, 'findOneAndUpdate')
                reward = await tiersJourneyRepository.findOneAndUpdate(tierJournyFilterQuery, tierJourneyStub())
            })

            test('then it should call the findOneAndUpdate function on tierJourneyModel', () => {
                expect(tierJourneyModel.findOneAndUpdate).toHaveBeenCalledWith(tierJournyFilterQuery, tierJourneyStub(), { lean: true, upsert: true, new: true })
            })

            test('then it should return as tier journey', () => {
                expect(reward).toEqual(tierJourneyStub())
            })
        })
    })
})