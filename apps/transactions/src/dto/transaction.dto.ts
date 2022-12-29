import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { Type } from "class-transformer";
import { IsPositive, IsOptional, IsPhoneNumber, IsEmail, IsString, IsNotEmpty, IsDate } from "class-validator"

export class TransactionDto {
    @IsOptional()
    _id?: string

    @ApiProperty({required: true})
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    trxDate: string;
    
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

    @ApiProperty({required: false})
    partnerId: number;

    @ApiProperty({required: false})
    partnerName: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    partnerReferCode: string;

    @ApiProperty({required: false})
    cashbackReferCode: string;

    @ApiProperty({required: true})
    @IsPositive()
    @IsNotEmpty()
    qty: number;

    @ApiProperty({required: true})
    @IsPositive()
    @IsNotEmpty()
    checkoutTotal: number;

    @ApiProperty({required: false})
    cashbackTrx: number;

    @ApiProperty({required: false})
    cashbackReward: number;

    @ApiProperty({required: false})
    cashbackTotal: number;
}