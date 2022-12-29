import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { Max, Min, IsNumber } from "class-validator"

export class PageRequestDto{
    @ApiProperty({required:true})
    @IsNumber()
    @Min(1)
    page: number = 1

    @ApiProperty({required:true})
    @IsNumber()
    @Max(100)
    limit: number = 10
}

export class PageResponseDto{
    @ApiProperty()
    @IsNumber()
    total: number

    @ApiProperty()
    @IsNumber()
    page: number

    @ApiProperty()
    @IsNumber()
    pages: number
}