import { HttpStatus } from "@nestjs/common";
import { Reward } from "../../schemas/reward.schema";
import { CreateRewardDto } from "../../dto/reward/request/create-reward.dto";
import { CreateRewardResponseDto } from "../../dto/reward/response/create-reward.response.dto";
import { ResponseRewardDto } from "../../dto/reward/response/response-reward.dto";

export const rewardStub = (): Reward => {
    return {
        _id: null,
        tier: "gold",
        recurring: 7,
        rewardAmount: 38000,
        status: 1,
        isDeleted: 0
    }
}

export const rewardStubArray = (): Reward[] => {
    return [{
        _id: null,
        tier: "gold",
        recurring: 7,
        rewardAmount: 38000,
        status: 1,
        isDeleted: 0
    }]
}

export const rewardCreateStub = (): CreateRewardDto => {
    return {
        tier: "gold",
        recurring: 7,
        rewardAmount: 38000,
        status: 1,
        isDeleted: 0
    }
}

export const responseRewardCreateStub = new CreateRewardResponseDto(
    HttpStatus.OK,
    `Create new reward data successfully`,
    {
        tier: "gold",
        recurring: 7,
        rewardAmount: 38000,
        status: 1,
        isDeleted: 0
    }
)

export const rewardUpdateStub = (): CreateRewardDto => {
    return {
        tier: "gold",
        recurring: 7,
        rewardAmount: 38000,
        status: 1,
        isDeleted: 0
    }
}

export const responseRewardUpdateStub = new CreateRewardResponseDto(
    HttpStatus.OK,
    `reward data success updated`,
    {
        tier: "gold",
        recurring: 7,
        rewardAmount: 38000,
        status: 1,
        isDeleted: 0
    }
)

export const rewardDeleteStub = (): CreateRewardDto => {
    return {
        tier: "gold",
        recurring: 7,
        rewardAmount: 38000,
        status: 1,
        isDeleted: 0
    }
}

export const responseRewardDeleteStub = new CreateRewardResponseDto(
    HttpStatus.OK,
    `reward data success deleted`,
    {
        tier: "gold",
        recurring: 7,
        rewardAmount: 38000,
        status: 1,
        isDeleted: 0
    }
)

export const findRewardStub = (): ResponseRewardDto => {
    return {
        total: 1,
        page: 1,
        pages: 1,
        data: {
            "_id": "63adb5c9ce02f101b2ba30ba",
            "tier": "gold",
            "recurring": 7,
            "rewardAmount": 38000,
            "status": 1,
            "isDeleted": 0
        },
    }
}

export const transactionSub = () => {
    return {
        transactions: {
            "trxDate": "2022-12-12",
            "customerEmail": "arstrois@gmail.com",
            "customerMsisdn": "+628111379309",
            "partnerReferCode": "123adsdadsa",
            "rewardReferCode": "testcodepromo",
            "qty": 1,
            "checkoutTotal": 10000
        }
    }
}

export const responseCashbackReward = 38000 