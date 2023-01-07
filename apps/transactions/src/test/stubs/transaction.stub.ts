import { HttpStatus } from "@nestjs/common";
import { Transaction } from "../../schemas/transaction.schema";

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
