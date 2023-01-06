import { HttpStatus } from "@nestjs/common";
import { CreateWalletDto } from "../../dto/request/create-wallet.dto";
import { CreateWalletResponseDto } from "../../dto/response/create-wallet.response.dto";
import { ResponseWalletDto } from "../../dto/response/response-wallet.dto";
import { Wallet } from "../../schemas/wallet.schema";

export const walletStub = (): Wallet => {
    return {
        _id: null,
        transactionId: "63b512c9b315e8427c643118",
        trxDate: "2022-12-12",
        customerEmail: "arstrois@gmail.com",
        customerMsisdn: "+628111379309",
        balance: 38000,
        lastBalance: 0,
        status: 1,
        isDeleted: 0
    }
}

export const walletStubArray = (): Wallet[] => {
    return [{
        _id: null,
        transactionId: "63b512c9b315e8427c643118",
        trxDate: "2022-12-12",
        customerEmail: "arstrois@gmail.com",
        customerMsisdn: "+628111379309",
        balance: 38000,
        lastBalance: 0,
        status: 1,
        isDeleted: 0
    }]
}

export const walletCreateStub = (): CreateWalletDto => {
    return {
        transactionId: "63b512c9b315e8427c643118",
        trxDate: "2022-12-12",
        customerEmail: "arstrois@gmail.com",
        customerMsisdn: "+628111379309",
        balance: 38000,
        lastBalance: 0,
        status: 1,
        isDeleted: 0
    }
}

export const responseWalletCreateStub = new CreateWalletResponseDto(
    HttpStatus.OK,
    `Create new wallet data successfully`,
    {
        transactionId: "63b512c9b315e8427c643118",
        trxDate: "2022-12-12",
        customerEmail: "arstrois@gmail.com",
        customerMsisdn: "+628111379309",
        balance: 38000,
        lastBalance: 0,
        status: 1,
        isDeleted: 0
    }
)


export const findWalletStub = (): ResponseWalletDto => {
    return {
        total: 1,
        page: 1,
        pages: 1,
        data: {
            "_id": "63b512c9b315e8427c644229",
            "transactionId": "63b512c9b315e8427c643118",
            "trxDate": "2022-12-12",
            "customerEmail": "arstrois@gmail.com",
            "customerMsisdn": "+628111379309",
            "balance": 38000,
            "lastBalance": 0,
            "status": 1,
            "isDeleted": 0
        },
    }
}