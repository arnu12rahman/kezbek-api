import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Tier } from "../schemas/tier.schema";

@Injectable()
export class TiersRepository extends AbstractRepository<Tier> {
    protected readonly logger = new Logger(TiersRepository.name)

    constructor(
        @InjectModel(Tier.name) TierModel: Model<Tier>,
        @InjectConnection() connection: Connection
    ) {
        super(TierModel, connection)
    }
}