import { OmitType } from "@nestjs/swagger";
import { CashbackDto } from "./cashback.dto";

export class CreateCashbackDto extends OmitType(CashbackDto,['_id']){}
