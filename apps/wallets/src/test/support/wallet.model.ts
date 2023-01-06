import { Wallet } from "../../schemas/wallet.schema";
import { walletStub } from "../stubs/wallet.stub";
import { MockModel } from "./mock.model";

export class WalletModel extends MockModel<Wallet>{
    protected entityStub = walletStub(); 
}