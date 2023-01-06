import { OmitType } from "@nestjs/swagger";
import { WalletDto } from "../core/wallet.dto";

export class CreateWalletDto extends OmitType(WalletDto,['_id']){}
