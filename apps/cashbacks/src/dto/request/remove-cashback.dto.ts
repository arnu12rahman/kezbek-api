import { OmitType } from "@nestjs/swagger";
import { CashbackDto } from "../core/cashback.dto";

export class RemoveCashbackDto extends OmitType(CashbackDto,['_id', 'cashbackReferCode','minQty','maxQty','isSetMaxQty','minAmountTrans','maxAmountTrans','isSetMaxAmountTrans','percentageCashback']){}
