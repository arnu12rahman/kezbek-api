import { Tier } from "../../schemas/tier.schema";
import { tierStub } from "../stubs/tier.stub";
import { MockModel } from "./mock.model";

export class TierModel extends MockModel<Tier>{
    protected entityStub = tierStub(); 
}