import { CreateCashbackDto } from "../../dto/request/create-cashback.dto";
import { Cashback } from "../../schemas/cashback.schema";
import { cashbackCreateStub, cashbackStub } from "../stubs/cashback.stub";
import { MockModel } from "./mock.model";

export class CashbackModel extends MockModel<Cashback>{
    protected entityStub = cashbackStub(); 
}