import { getConnectionToken, getModelToken } from "@nestjs/mongoose"
import { Test } from "@nestjs/testing"
import { FilterQuery } from "mongoose"
import { WalletsRepository } from "../wallets.repository"
import { Wallet } from "../schemas/wallet.schema"
import { walletStub, walletStubArray } from "./stubs/wallet.stub"
import { WalletModel } from "./support/wallet.model"

describe('WalletsRepository', () => {
    let walletsRepository: WalletsRepository
    let walletModel: WalletModel
    let walletFilterQuery: FilterQuery<Wallet>

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                WalletsRepository, {
                    provide: getModelToken(Wallet.name),
                    useClass: WalletModel,
                },
                {
                    provide: getConnectionToken(),
                    useValue: {}
                }
            ]
        }).compile()

        walletsRepository = moduleRef.get<WalletsRepository>(WalletsRepository)
        walletModel = moduleRef.get<WalletModel>(getModelToken(Wallet.name))
        walletFilterQuery = {
            _id: walletStub()._id
        }
        jest.clearAllMocks()
    })

    describe('findOne', () => {
        describe('when findOne is called', () => {
            let wallet: Wallet

            beforeEach(async () => {
                jest.spyOn(walletModel, 'findOne')
                wallet = await walletsRepository.findOne(walletFilterQuery)
            })

            test('then it should call the findOne function on walletModel', () => {
                expect(walletModel.findOne).toHaveBeenCalledWith(walletFilterQuery, {}, { lean: true })
            })

            test('then it should return as wallet', () => {
                expect(wallet).toEqual(walletStub())
            })
        })
    })

    describe('find', () => {
        describe('when find is called', () => {
            let wallets: Wallet[]

            beforeEach(async () => {
                jest.spyOn(walletModel, 'find')
                wallets = await walletsRepository.find(walletFilterQuery)
            })

            test('then it should call the find function onwalletModel', () => {
                expect(walletModel.find).toHaveBeenCalledWith(walletFilterQuery, {}, { lean: true })
            })

            test('then it should return as wallets', () => {
                expect(wallets).toEqual(walletStubArray())
            })
        })
    })

    describe('findOneAndUpdate', () => {
        describe('when findOneAndUpdate is called', () => {
            let wallet: Wallet

            beforeEach(async () => {
                jest.spyOn(walletModel, 'findOneAndUpdate')
                wallet = await walletsRepository.findOneAndUpdate(walletFilterQuery, walletStub())
            })

            test('then it should call the findOneAndUpdate function on walletModel', () => {
                expect(walletModel.findOneAndUpdate).toHaveBeenCalledWith(walletFilterQuery, walletStub(), { lean: true, upsert: true, new: true })
            })

            test('then it should return as wallet', () => {
                expect(wallet).toEqual(walletStub())
            })
        })
    })
})