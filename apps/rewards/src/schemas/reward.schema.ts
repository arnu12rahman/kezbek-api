import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Reward extends AbstractDocument {
    @Prop({ default: 'bronze'})
    tier: string;

    @Prop({ default: 1})
    recurring: number;

    @Prop({ default: 0})
    rewardAmount: number;

    @Prop({ default: 1})
    status: number;

    @Prop({ default: 0})
    isDeleted: number;
}

export const RewardSchema = SchemaFactory.createForClass(Reward)