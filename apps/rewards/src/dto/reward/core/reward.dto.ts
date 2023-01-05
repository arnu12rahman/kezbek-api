import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { IsPositive, IsOptional, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class RewardDto {
    @IsOptional()
    _id?: any

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    tier: string;

    @ApiProperty({ required: true })
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    recurring: number;

    @ApiProperty({ required: true })
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    rewardAmount: number;

    @ApiProperty({ required: false })
    status: number;

    @ApiProperty({ required: false })
    isDeleted: number;
}
