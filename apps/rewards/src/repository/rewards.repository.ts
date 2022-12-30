import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Reward } from "../schemas/reward.schema";

@Injectable()
export class RewardsRepository extends AbstractRepository<Reward> {
    protected readonly logger = new Logger(RewardsRepository.name)

    constructor(
        @InjectModel(Reward.name) RewardModel: Model<Reward>,
        @InjectConnection() connection: Connection
    ) {
        super(RewardModel, connection)
    }
}