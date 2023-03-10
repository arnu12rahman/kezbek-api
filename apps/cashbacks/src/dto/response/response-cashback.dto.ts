import { PageResponseDto } from "@app/common";
import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { CashbackDto } from "../core/cashback.dto";

export class ResponseCashbackDto extends PageResponseDto{
    @ApiProperty({type:[CashbackDto]})
    data: CashbackDto
}