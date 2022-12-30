import { PageResponseDto } from "@app/common";
import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { RewardDto } from "./reward.dto";

export class ResponseRewardDto extends PageResponseDto{
    @ApiProperty({type:[RewardDto]})
    data: RewardDto
}