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

    @Prop({ default: 0})
    partnerId: number;

    @Prop({ default: 'partner_name'})
    partnerName: string;

    @Prop()
    partnerReferCode: string;

    @Prop({ default: 'cashback_refer_code'})
    cashbackReferCode: string;

    @Prop()
    qty: number;

    @Prop()
    checkoutTotal: number;

    @Prop({ default: 0})
    cashbackTrx: number;

    @Prop({ default: 0})
    cashbackReward: number;

    @Prop({ default: 0})
    cashbackTotal: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)