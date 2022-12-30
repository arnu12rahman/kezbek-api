import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Tier extends AbstractDocument {
    @Prop()
    customerEmail: string;

    @Prop()
    customerMsisdn: string;

    @Prop({ default: 'bronze'})
    tier: string;

    @Prop({ default: 'bronze'})
    lastTier: string;

    @Prop({ default: 1})
    trxRecurring: number;

    @Prop()
    expDate: string;

    @Prop({ default: 0})
    isDeleted: number;
}

export const TierSchema = SchemaFactory.createForClass(Tier)