import { rewardCreateStub, rewardDeleteStub, rewardUpdateStub, findRewardStub, responseCashbackReward } from "../test/stubs/reward.stub";

export const RewardsService = jest.fn().mockReturnValue({
    create: jest.fn().mockResolvedValue(rewardCreateStub()),
    update: jest.fn().mockResolvedValue(rewardUpdateStub()),
    remove: jest.fn().mockResolvedValue(rewardDeleteStub()),
    getRewards: jest.fn().mockResolvedValue(findRewardStub()),
    calculateReward: jest.fn().mockResolvedValue(responseCashbackReward)
})