import { OmitType } from "@nestjs/swagger";
import { JourneyDto } from "./journey.dto";

export class CreateJourneyDto extends OmitType(JourneyDto,['_id']){}
