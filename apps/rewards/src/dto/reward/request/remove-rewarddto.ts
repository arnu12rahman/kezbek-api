import { OmitType } from "@nestjs/swagger";
import { RewardDto } from "../core/reward.dto";

export class RemoveRewardDto extends OmitType(RewardDto,['_id', 'tier', 'recurring', 'rewardAmount']){}
