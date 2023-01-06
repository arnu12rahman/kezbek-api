import { PageResponseDto } from "@app/common";
import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { WalletDto } from "../core/wallet.dto";

export class ResponseWalletDto extends PageResponseDto{
    @ApiProperty({type:[WalletDto]})
    data: WalletDto
}