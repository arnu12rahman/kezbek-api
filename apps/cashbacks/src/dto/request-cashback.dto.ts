import { PageRequestDto } from "@app/common";
import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { IsString, IsOptional, MinLength  } from "class-validator"

export class RequestCashbackDto extends PageRequestDto{
    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    @MinLength(5)
    cashbackCode: string;
}