import { findWalletStub, walletCreateStub } from "../test/stubs/wallet.stub";

export const WalletsService = jest.fn().mockReturnValue({
    create: jest.fn().mockResolvedValue(walletCreateStub()),
    getWallets: jest.fn().mockResolvedValue(findWalletStub()),
})