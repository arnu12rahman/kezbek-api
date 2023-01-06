import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Wallet } from "./schemas/wallet.schema";

@Injectable()
export class WalletsRepository extends AbstractRepository<Wallet> {
    protected readonly logger = new Logger(WalletsRepository.name)

    constructor(
        @InjectModel(Wallet.name) WalletModel: Model<Wallet>,
        @InjectConnection() connection: Connection
    ) {
        super(WalletModel, connection)
    }
}