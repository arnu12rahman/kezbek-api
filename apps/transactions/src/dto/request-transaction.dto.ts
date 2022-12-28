import { PageRequestDto } from "@app/common";
import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { IsString, IsOptional, MinLength, IsEmail  } from "class-validator"

export class RequestTransactionDto extends PageRequestDto{
    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    @IsEmail()
    @MinLength(5)
    customerEmail: string;
}