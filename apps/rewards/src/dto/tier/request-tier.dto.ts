import { PageRequestDto } from "@app/common";
import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { IsString, IsOptional, IsPhoneNumber  } from "class-validator"

export class RequestTierDto extends PageRequestDto{
    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    customerEmail: string;

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    @IsPhoneNumber()
    customerMsisdn: string;
}