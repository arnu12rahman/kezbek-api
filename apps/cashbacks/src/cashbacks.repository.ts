import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Cashback } from "./schemas/cashback.schema";

@Injectable()
export class CashbacksRepository extends AbstractRepository<Cashback> {
    protected readonly logger = new Logger(CashbacksRepository.name)

    constructor(
        @InjectModel(Cashback.name) CashbackModel: Model<Cashback>,
        @InjectConnection() connection: Connection
    ) {
        super(CashbackModel, connection)
    }
}