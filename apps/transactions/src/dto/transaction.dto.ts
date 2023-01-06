import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { IsPositive, IsOptional, IsPhoneNumber, IsEmail, IsString, IsNotEmpty, Min, IsDateString } from "class-validator"

export class TransactionDto {

    @IsOptional()
    _id?: string

    @ApiProperty({required: true})
    @IsDateString()
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
    partnerId: string;

    @ApiProperty({required: false})
    partnerName: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    partnerReferCode: string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    cashbackReferCode: string;

    @ApiProperty({required: true})
    @IsPositive()
    @IsNotEmpty()
    @Min(1)
    qty: number;

    @ApiProperty({required: true})
    @IsPositive()
    @IsNotEmpty()
    @Min(1)
    checkoutTotal: number;

    @ApiProperty({required: false})
    cashbackTrx: number;

    @ApiProperty({required: false})
    cashbackReward: number;

    @ApiProperty({required: false})
    cashbackTotal: number;
}