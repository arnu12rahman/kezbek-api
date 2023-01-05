import { getConnectionToken, getModelToken } from "@nestjs/mongoose"
import { Test } from "@nestjs/testing"
import { FilterQuery } from "mongoose"
import { PartnersRepository } from "../partners.repository"
import { Partner } from "../schemas/partner.schema"
import { partnerStub, partnerStubArray } from "./stubs/partner.stub"
import { PartnerModel } from "./support/partner.model"

describe('PartnersRepository', () => {
    let partnersRepository: PartnersRepository
    let partnerModel: PartnerModel
    let partnerFilterQuery: FilterQuery<Partner>

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                PartnersRepository, {
                    provide: getModelToken(Partner.name),
                    useClass: PartnerModel,
                },
                {
                    provide: getConnectionToken(),
                    useValue: {}
                }
            ]
        }).compile()

        partnersRepository = moduleRef.get<PartnersRepository>(PartnersRepository)
        partnerModel = moduleRef.get<PartnerModel>(getModelToken(Partner.name))
        partnerFilterQuery = {
            _id: partnerStub()._id
        }
        jest.clearAllMocks()
    })

    describe('findOne', () => {
        describe('when findOne is called', () => {
            let partner: Partner

            beforeEach(async () => {
                jest.spyOn(partnerModel, 'findOne')
                partner = await partnersRepository.findOne(partnerFilterQuery)
            })

            test('then it should call the findOne function on partnerModel', () => {
                expect(partnerModel.findOne).toHaveBeenCalledWith(partnerFilterQuery, {}, { lean: true })
            })

            test('then it should return as partner', () => {
                expect(partner).toEqual(partnerStub())
            })
        })
    })

    describe('find', () => {
        describe('when find is called', () => {
            let partners: Partner[]

            beforeEach(async () => {
                jest.spyOn(partnerModel, 'find')
                partners = await partnersRepository.find(partnerFilterQuery)
            })

            test('then it should call the find function onpartnerModel', () => {
                expect(partnerModel.find).toHaveBeenCalledWith(partnerFilterQuery, {}, { lean: true })
            })

            test('then it should return as partners', () => {
                expect(partners).toEqual(partnerStubArray())
            })
        })
    })

    describe('findOneAndUpdate', () => {
        describe('when findOneAndUpdate is called', () => {
            let partner: Partner

            beforeEach(async () => {
                jest.spyOn(partnerModel, 'findOneAndUpdate')
                partner = await partnersRepository.findOneAndUpdate(partnerFilterQuery, partnerStub())
            })

            test('then it should call the findOneAndUpdate function on partnerModel', () => {
                expect(partnerModel.findOneAndUpdate).toHaveBeenCalledWith(partnerFilterQuery, partnerStub(), { lean: true, new: true })
            })

            test('then it should return as partner', () => {
                expect(partner).toEqual(partnerStub())
            })
        })
    })
})