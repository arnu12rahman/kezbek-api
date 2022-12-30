import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { TierJournery } from "../schemas/tier-journey.schema";

@Injectable()
export class TiersJourneyRepository extends AbstractRepository<TierJournery> {
    protected readonly logger = new Logger(TiersJourneyRepository.name)

    constructor(
        @InjectModel(TierJournery.name) TierJourneryModel: Model<TierJournery>,
        @InjectConnection() connection: Connection
    ) {
        super(TierJourneryModel, connection)
    }
}