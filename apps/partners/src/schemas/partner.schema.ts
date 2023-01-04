import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Partner extends AbstractDocument {
    @Prop()
    partnerReferCode: string;

    @Prop()
    partnerName: string;

    @Prop()
    partnerEmail: string;

    @Prop()
    partnerMsisdn: string;

    @Prop()
    partnerAddress: string;

    @Prop()
    apiKey: string;

    @Prop({ default: 1})
    status: number;

    @Prop({ default: 0})
    isDeleted: number;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner)