import { OmitType } from "@nestjs/swagger";
import { RewardDto } from "../core/reward.dto";

export class CreateRewardDto extends OmitType(RewardDto,['_id']){}
