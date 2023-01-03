import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { IsOptional, IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator"

export class JourneyDto {
    @IsOptional()
    _id?: string

    @ApiProperty({required: true})
    @IsString()
    @IsNotEmpty()
    trxID?: string

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

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    tier: string;
}
