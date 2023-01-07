import { Transaction } from "../../schemas/transaction.schema";
import { transStub } from "../stubs/transaction.stub";
import { MockModel } from "./mock.model";

export class TransactionModel extends MockModel<Transaction>{
    protected entityStub = transStub(); 
}