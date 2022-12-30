import { PageRequestDto } from "@app/common";
import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { IsString, IsOptional  } from "class-validator"

export class RequestRewardDto extends PageRequestDto{
    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    tier: string;
}