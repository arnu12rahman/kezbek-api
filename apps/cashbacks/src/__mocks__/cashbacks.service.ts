import { cashbackCreateStub, cashbackDeleteStub, cashbackUpdateStub, findCashbackStub, responseCashbackTrx } from "../test/stubs/cashback.stub";

export const CashbacksService = jest.fn().mockReturnValue({
    create: jest.fn().mockResolvedValue(cashbackCreateStub()),
    update: jest.fn().mockResolvedValue(cashbackUpdateStub()),
    remove: jest.fn().mockResolvedValue(cashbackDeleteStub()),
    getCashbacks: jest.fn().mockResolvedValue(findCashbackStub()),
    calculateCashback: jest.fn().mockResolvedValue(responseCashbackTrx)
})