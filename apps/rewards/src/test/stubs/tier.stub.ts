import { HttpStatus } from "@nestjs/common";
import { Transaction } from "apps/transactions/src/schemas/transaction.schema";
import { Tier } from "../../schemas/tier.schema";

export const tierStub = (): Tier => {
    return {
        _id: null,
        customerEmail: "arnu12rahman@gmail.com",
        customerMsisdn: "+628111379309",
        tier: "bronze",
        lastTier: "bronze",
        trxRecurring: 1,
        expDate: "2023-02-01",
        isDeleted: 0
    }
}

export const transStub = (): Transaction => {
    return {
        _id: null,
        trxDate: "2023-01-20",
        customerEmail: "arnu12rahman@gmail.com",
        customerMsisdn: "+628111379309",
        partnerId: "63b7a911eec084c5e79aab83",
        partnerName: "Shopee",
        partnerReferCode: "shp_kzb",
        cashbackReferCode: "testcodepromo",
        qty: 1,
        checkoutTotal: 10000,
        cashbackTrx: 120,
        cashbackReward: 0,
        cashbackTotal: 120
    }
}

export const transStubData = () => {
    return {
        transaction: {
            _id: null,
            trxDate: "2023-01-20",
            customerEmail: "arnu12rahman@gmail.com",
            customerMsisdn: "+628111379309",
            partnerId: "63b7a911eec084c5e79aab83",
            partnerName: "Shopee",
            partnerReferCode: "shp_kzb",
            cashbackReferCode: "testcodepromo",
            qty: 1,
            checkoutTotal: 10000,
            cashbackTrx: 120,
            cashbackReward: 0,
            cashbackTotal: 120
        }
    }
}

export const responseUpdateTier = () => {
    return {"newLastTier": "gold", "newRecurring": 7, "newTier": "gold"}
}