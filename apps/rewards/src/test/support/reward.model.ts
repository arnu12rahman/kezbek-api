import { Reward } from "../../schemas/reward.schema";
import { rewardStub } from "../stubs/reward.stub";
import { MockModel } from "./mock.model";

export class RewardModel extends MockModel<Reward>{
    protected entityStub = rewardStub(); 
}