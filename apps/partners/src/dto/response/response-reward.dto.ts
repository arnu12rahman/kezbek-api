import { PageResponseDto } from "@app/common";
import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { PartnerDto } from "../core/partner.dto";

export class ResponseRewardDto extends PageResponseDto{
    @ApiProperty({type:[PartnerDto]})
    data: PartnerDto
}