import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { IsPositive, IsOptional, IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator"

export class TierDto {
    @IsOptional()
    _id?: string

    @ApiProperty({required: true})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    customerEmail: string;

    @ApiProperty({required: true})
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    customerMsisdn: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    tier: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    lastTier: string;

    @ApiProperty({ required: true })
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    trxRecurring: number;

    @ApiProperty({required: true})
    @IsDateString()
    @IsNotEmpty()
    expDate: string;

    @ApiProperty({ required: false })
    isDeleted: number;
}
