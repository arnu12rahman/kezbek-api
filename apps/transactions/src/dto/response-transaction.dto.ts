import { PageResponseDto } from "@app/common";
import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { TransactionDto } from "./transaction.dto";

export class ResponseTransactionDto extends PageResponseDto{
    @ApiProperty({type:[TransactionDto]})
    data: TransactionDto
}