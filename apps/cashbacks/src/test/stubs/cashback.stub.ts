import { CreateCashbackDto } from "../../dto/request/create-cashback.dto";
import { CreateCachbackResponseDto } from "../../dto/response/create-cashback.response.dto";
import { ResponseCashbackDto } from "../../dto/response/response-cashback.dto";
import { HttpStatus } from "@nestjs/common";
import { Cashback } from "../../schemas/cashback.schema";

export const cashbackStub = (): Cashback => {
    return {
        _id: null,
        cashbackReferCode: "kez06bek",
        minQty: 3,
        maxQty: 0,
        isSetMaxQty: 0,
        minAmountTrans: 1500000,
        maxAmountTrans: 0,
        isSetMaxAmountTrans: 0,
        percentageCashback: 3.35,
        status: 1,
        isDeleted: 0
    }
}

export const cashbackStubArray = (): Cashback[] => {
    return [{
        _id: null,
        cashbackReferCode: "kez06bek",
        minQty: 3,
        maxQty: 0,
        isSetMaxQty: 0,
        minAmountTrans: 1500000,
        maxAmountTrans: 0,
        isSetMaxAmountTrans: 0,
        percentageCashback: 3.35,
        status: 1,
        isDeleted: 0
    }]
}

export const cashbackCreateStub = (): CreateCashbackDto => {
    return {
        cashbackReferCode: "kez06bek",
        minQty: 3,
        maxQty: 0,
        isSetMaxQty: 0,
        minAmountTrans: 1500000,
        maxAmountTrans: 0,
        isSetMaxAmountTrans: 0,
        percentageCashback: 3.35,
        status: 1,
        isDeleted: 0
    }
}

export const responseCashbackCreateStub = new CreateCachbackResponseDto(
    HttpStatus.OK,
    `Create new cashback data successfully`,
    {
        cashbackReferCode: "kez06bek",
        minQty: 3,
        maxQty: 0,
        isSetMaxQty: 0,
        minAmountTrans: 1500000,
        maxAmountTrans: 0,
        isSetMaxAmountTrans: 0,
        percentageCashback: 3.35,
        status: 1,
        isDeleted: 0
    }
)

export const cashbackUpdateStub = (): CreateCashbackDto => {
    return {
        cashbackReferCode: "kezbekUpdate",
        minQty: 3,
        maxQty: 0,
        isSetMaxQty: 0,
        minAmountTrans: 1500000,
        maxAmountTrans: 0,
        isSetMaxAmountTrans: 0,
        percentageCashback: 3.35,
        status: 1,
        isDeleted: 0
    }
}

export const responseCashbackUpdateStub = new CreateCachbackResponseDto(
    HttpStatus.OK,
    `cashback data success updated`,
    {
        cashbackReferCode: "kezbekUpdate",
        minQty: 3,
        maxQty: 0,
        isSetMaxQty: 0,
        minAmountTrans: 1500000,
        maxAmountTrans: 0,
        isSetMaxAmountTrans: 0,
        percentageCashback: 3.35,
        status: 1,
        isDeleted: 0
    }
)

export const cashbackDeleteStub = (): CreateCashbackDto => {
    return {
        cashbackReferCode: "kez06bek",
        minQty: 3,
        maxQty: 0,
        isSetMaxQty: 0,
        minAmountTrans: 1500000,
        maxAmountTrans: 0,
        isSetMaxAmountTrans: 0,
        percentageCashback: 3.35,
        status: 0,
        isDeleted: 1
    }
}

export const responseCashbackDeleteStub = new CreateCachbackResponseDto(
    HttpStatus.OK,
    `cashback data success deleted`,
    {
        cashbackReferCode: "kez06bek",
        minQty: 3,
        maxQty: 0,
        isSetMaxQty: 0,
        minAmountTrans: 1500000,
        maxAmountTrans: 0,
        isSetMaxAmountTrans: 0,
        percentageCashback: 3.35,
        status: 0,
        isDeleted: 1
    }
)

export const findCashbackStub = (): ResponseCashbackDto => {
    return {
        total: 1,
        page: 1,
        pages: 1,
        data: {
            "_id": "63adb5c9ce02f101b2ba30ba",
            "cashbackReferCode": "kez07bek",
            "minQty": 3,
            "maxQty": 0,
            "isSetMaxQty": 0,
            "minAmountTrans": 1500000,
            "maxAmountTrans": 0,
            "isSetMaxAmountTrans": 0,
            "percentageCashback": 3.35,
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
            "cashbackReferCode": "testcodepromo",
            "qty": 1,
            "checkoutTotal": 10000
        }
    }
}

export const responseCashbackTrx = 120 