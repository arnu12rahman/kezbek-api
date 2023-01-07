import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { IsOptional, IsPhoneNumber, IsEmail, IsString, IsNotEmpty, IsPositive, IsNumber } from "class-validator"

export class PartnerDto {
    @IsOptional()
    _id?: any

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    partnerReferCode: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    partnerName: string;

    @ApiProperty({required: true})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    partnerEmail: string;

    @ApiProperty({required: true})
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    partnerMsisdn: string;

    @ApiProperty({required: true})
    @IsString()
    @IsNotEmpty()
    partnerAddress: string;

    @ApiProperty({required: false})
    @IsPositive()
    @IsNumber()
    status: number;

    @ApiProperty({required: false})
    @IsPositive()
    @IsNumber()
    isDeleted: number;
}