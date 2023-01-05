import { getConnectionToken, getModelToken } from "@nestjs/mongoose"
import { Test } from "@nestjs/testing"
import { FilterQuery } from "mongoose"
import { CashbacksRepository } from "../cashbacks.repository"
import { Cashback } from "../schemas/cashback.schema"
import { cashbackStub, cashbackStubArray } from "./stubs/cashback.stub"
import { CashbackModel } from "./support/cashback.model"

describe('CashbacksRepository', () => {
    let cashbacksRepository: CashbacksRepository
    let cashbackModel: CashbackModel
    let cashbackFilterQuery: FilterQuery<Cashback>

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                CashbacksRepository, {
                    provide: getModelToken(Cashback.name),
                    useClass: CashbackModel,
                },
                {
                    provide: getConnectionToken(),
                    useValue: {}
                }
            ]
        }).compile()

        cashbacksRepository = moduleRef.get<CashbacksRepository>(CashbacksRepository)
        cashbackModel = moduleRef.get<CashbackModel>(getModelToken(Cashback.name))
        cashbackFilterQuery = {
            _id: cashbackStub()._id
        }
        jest.clearAllMocks()
    })

    describe('findOne', () => {
        describe('when findOne is called', () => {
            let cashback: Cashback

            beforeEach(async () => {
                jest.spyOn(cashbackModel, 'findOne')
                cashback = await cashbacksRepository.findOne(cashbackFilterQuery)
            })

            test('then it should call the findOne function on cashbackModel', () => {
                expect(cashbackModel.findOne).toHaveBeenCalledWith(cashbackFilterQuery, {}, { lean: true })
            })

            test('then it should return as cashback', () => {
                expect(cashback).toEqual(cashbackStub())
            })
        })
    })

    describe('find', () => {
        describe('when find is called', () => {
            let cashbacks: Cashback[]

            beforeEach(async () => {
                jest.spyOn(cashbackModel, 'find')
                cashbacks = await cashbacksRepository.find(cashbackFilterQuery)
            })

            test('then it should call the find function oncashbackModel', () => {
                expect(cashbackModel.find).toHaveBeenCalledWith(cashbackFilterQuery, {}, { lean: true })
            })

            test('then it should return as cashbacks', () => {
                expect(cashbacks).toEqual(cashbackStubArray())
            })
        })
    })

    describe('findOneAndUpdate', () => {
        describe('when findOneAndUpdate is called', () => {
            let cashback: Cashback

            beforeEach(async () => {
                jest.spyOn(cashbackModel, 'findOneAndUpdate')
                cashback = await cashbacksRepository.findOneAndUpdate(cashbackFilterQuery, cashbackStub())
            })

            test('then it should call the findOneAndUpdate function on cashbackModel', () => {
                expect(cashbackModel.findOneAndUpdate).toHaveBeenCalledWith(cashbackFilterQuery, cashbackStub(), { lean: true, new: true })
            })

            test('then it should return as cashback', () => {
                expect(cashback).toEqual(cashbackStub())
            })
        })
    })
})