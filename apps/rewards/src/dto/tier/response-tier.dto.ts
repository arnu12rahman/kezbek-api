import { PageResponseDto } from "@app/common";
import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { TierDto } from "./tier.dto";

export class ResponseTierDto extends PageResponseDto{
    @ApiProperty({type:[TierDto]})
    data: TierDto
}