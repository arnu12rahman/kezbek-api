import { PageRequestDto } from "@app/common";
import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { IsString, IsOptional, MinLength, IsEmail, IsPhoneNumber  } from "class-validator"

export class RequestPartnerDto extends PageRequestDto{
    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    @MinLength(5)
    partnerName: string;

    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    @IsEmail()
    @MinLength(5)
    partnerEmail: string;

    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    partnerMsisdn: string;
}