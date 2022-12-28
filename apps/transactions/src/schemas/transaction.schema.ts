import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Transaction extends AbstractDocument {
    @Prop()
    trxDate: string;

    @Prop()
    customerEmail: string;

    @Prop()
    customerMsisdn: string;

    @Prop()
    partnerId: number;

    @Prop()
    partnerName: string;

    @Prop()
    partnerReferCode: string;

    @Prop()
    cashbackReferCode: string;

    @Prop()
    qty: number;

    @Prop()
    checkoutTotal: number;

    @Prop()
    cashbackTrx: number;

    @Prop()
    cashbackReward: number;

    @Prop()
    cashbackTotal: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)