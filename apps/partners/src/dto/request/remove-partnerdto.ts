import { OmitType } from "@nestjs/swagger";
import { PartnerDto } from "../core/partner.dto";

export class RemovePartnerDto extends OmitType(PartnerDto,['_id', 'partnerReferCode', 'partnerName', 'partnerEmail','partnerMsisdn','partnerAddress']){}
