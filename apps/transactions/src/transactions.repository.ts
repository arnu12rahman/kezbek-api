import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Transaction } from "./schemas/transaction.schema";

@Injectable()
export class TransactionsRepository extends AbstractRepository<Transaction> {
    protected readonly logger = new Logger(TransactionsRepository.name)

    constructor(
        @InjectModel(Transaction.name) TransactionModel: Model<Transaction>,
        @InjectConnection() connection: Connection
    ) {
        super(TransactionModel, connection)
    }
}