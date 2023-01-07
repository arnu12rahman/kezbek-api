import { responseUpdateTier, tierStub, transStub } from "../test/stubs/tier.stub";

export const TierService = jest.fn().mockReturnValue({
    trxThisMonth: jest.fn().mockResolvedValue(transStub()),
    getTierData: jest.fn().mockResolvedValue(tierStub()),
    downgradeTierCat: jest.fn().mockResolvedValue('bronze'),
    upgradeTierCat: jest.fn().mockResolvedValue(responseUpdateTier()),
})