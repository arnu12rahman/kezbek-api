import { TierJournery } from "../../schemas/tier-journey.schema";
import { tierJourneyStub } from "../stubs/tier-journey.stub";
import { MockModel } from "./mock.model";

export class TierJourneryModel extends MockModel<TierJournery>{
    protected entityStub = tierJourneyStub(); 
}