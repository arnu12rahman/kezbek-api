import { getConnectionToken, getModelToken } from "@nestjs/mongoose"
import { Test } from "@nestjs/testing"
import { FilterQuery } from "mongoose"
import { TiersRepository } from "../repository/tiers.repository"
import { Tier } from "../schemas/tier.schema"
import { tierStub } from "./stubs/tier.stub"
import { TierModel } from "./support/tier.model"

describe('TiersRepository', () => {
    let tiersRepository: TiersRepository
    let tierModel: TierModel
    let tierFilterQuery: FilterQuery<Tier>

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                TiersRepository, {
                    provide: getModelToken(Tier.name),
                    useClass: TierModel,
                },
                {
                    provide: getConnectionToken(),
                    useValue: {}
                }
            ]
        }).compile()

        tiersRepository = moduleRef.get<TiersRepository>(TiersRepository)
        tierModel = moduleRef.get<TierModel>(getModelToken(Tier.name))
        tierFilterQuery = {
            _id: tierStub()._id
        }
        jest.clearAllMocks()
    })

    describe('findOne', () => {
        describe('when findOne is called', () => {
            let tier: Tier

            beforeEach(async () => {
                jest.spyOn(tierModel, 'findOne')
                tier = await tiersRepository.findOne(tierFilterQuery)
            })

            test('then it should call the findOne function on tierModel', () => {
                expect(tierModel.findOne).toHaveBeenCalledWith(tierFilterQuery, {}, { lean: true })
            })

            test('then it should return as tier', () => {
                expect(tier).toEqual(tierStub())
            })
        })
    })

    describe('findOneAndUpdate', () => {
        describe('when findOneAndUpdate is called', () => {
            let tier: Tier

            beforeEach(async () => {
                jest.spyOn(tierModel, 'findOneAndUpdate')
                tier = await tiersRepository.findOneAndUpdate(tierFilterQuery, tierStub())
            })

            test('then it should call the findOneAndUpdate function on tierModel', () => {
                expect(tierModel.findOneAndUpdate).toHaveBeenCalledWith(tierFilterQuery, tierStub(), { lean: true, upsert: true, new: true })
            })

            test('then it should return as tier', () => {
                expect(tier).toEqual(tierStub())
            })
        })
    })
})