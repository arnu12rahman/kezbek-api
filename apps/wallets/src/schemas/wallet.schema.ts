import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Wallet extends AbstractDocument {
    @Prop()
    transactionId: string;

    @Prop()
    trxDate: string;

    @Prop()
    customerEmail: string;

    @Prop()
    customerMsisdn: string;

    @Prop({ default: 0})
    balance: number;

    @Prop({ default: 0})
    lastBalance: number;

    @Prop({ default: 1})
    status: number;

    @Prop({ default: 0})
    isDeleted: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet)