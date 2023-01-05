import { OmitType } from "@nestjs/swagger";
import { CashbackDto } from "../core/cashback.dto";

export class CreateCashbackDto extends OmitType(CashbackDto,['_id']){}
