import { HttpStatus } from "@nestjs/common";
import { TierJournery } from "../../schemas/tier-journey.schema";

export const tierJourneyStub = (): TierJournery => {
    return {
        _id: null,
        trxID: "63b661bbf111cd23e52fdc6a",
        trxDate: "2023-01-01",
        customerEmail: "arnu12rahman@gmail.com",
        customerMsisdn: "+628111379309",
        tier: "bronze"
    }
}