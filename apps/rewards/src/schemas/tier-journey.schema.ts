import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class TierJournery extends AbstractDocument {
    @Prop()
    trxID: string;
    
    @Prop()
    trxDate: string;

    @Prop()
    customerEmail: string;

    @Prop()
    customerMsisdn: string;

    @Prop({ default: 'bronze'})
    tier: string;
}

export const TierJournerySchema = SchemaFactory.createForClass(TierJournery)