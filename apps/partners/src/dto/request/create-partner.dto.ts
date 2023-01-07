import { OmitType } from "@nestjs/swagger";
import { PartnerDto } from "../core/partner.dto";

export class CreatePartnerDto extends OmitType(PartnerDto,['_id']){}
