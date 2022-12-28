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

    partnerId: number;
    partnerName: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    partnerReferCode: string;

    @ApiProperty({required: true})
    @IsString()
    @IsNotEmpty()
    cashbackReferCode: string;

    @ApiProperty({required: true})
    @IsPositive()
    @IsNotEmpty()
    qty: number;

    @ApiProperty({required: true})
    @IsPositive()
    @IsNotEmpty()
    checkoutTotal: number;

    cashbackTrx: number;
    cashbackReward: number;
    cashbackTotal: number;
}