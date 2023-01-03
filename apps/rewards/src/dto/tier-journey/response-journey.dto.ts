import { PageResponseDto } from "@app/common";
import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { JourneyDto } from "./journey.dto";

export class ResponseTierDto extends PageResponseDto{
    @ApiProperty({type:[JourneyDto]})
    data: JourneyDto
}