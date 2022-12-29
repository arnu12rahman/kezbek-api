import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Cashback extends AbstractDocument {
    @Prop()
    cashbackReferCode: string;

    @Prop({ default: 0})
    minQty: number;

    @Prop({ default: 0})
    maxQty: number;

    @Prop({ default: 1})
    isSetMaxQty: number;

    @Prop({ default: 0})
    minAmountTrans: number;

    @Prop({ default: 0})
    maxAmountTrans: number;

    @Prop({ default: 1})
    isSetMaxAmountTrans: number;

    @Prop({ default: 0})
    percentageCashback: number;

    @Prop({ default: 1})
    status: number;

    @Prop({ default: 0})
    isDeleted: number;
}

export const CashbackSchema = SchemaFactory.createForClass(Cashback)