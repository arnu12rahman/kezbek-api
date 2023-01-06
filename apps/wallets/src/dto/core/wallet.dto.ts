import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import {IsOptional, IsNotEmpty, IsString, IsDateString, IsEmail, IsPhoneNumber, IsPositive } from "class-validator"

export class WalletDto {
    @IsOptional()
    _id?: any

    @ApiProperty({required: true})
    transactionId: string;

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

    @ApiProperty({required: true})
    @IsPositive()
    @IsNotEmpty()
    balance: number;

    @ApiProperty({required: false})
    lastBalance: number;

    @ApiProperty({required: false})
    status: number;

    @ApiProperty({required: false})
    isDeleted: number;
}