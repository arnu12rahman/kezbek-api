import { OmitType } from "@nestjs/swagger";
import { TierDto } from "./tier.dto";

export class CreateTierDto extends OmitType(TierDto,['_id']){}
