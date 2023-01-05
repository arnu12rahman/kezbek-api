import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { IsPositive, IsOptional, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CashbackDto {
    @IsOptional()
    _id?: any

    @ApiProperty({required: true})
    @IsString()
    @IsNotEmpty()
    cashbackReferCode: string;

    @ApiProperty({required: true})
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    minQty: number;

    @ApiProperty({required: false})
    @IsPositive()
    @IsNumber()
    @IsOptional()
    maxQty: number;
    
    @ApiProperty({required: true})
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    isSetMaxQty: number;

    @ApiProperty({required: true})
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    minAmountTrans: number;

    @ApiProperty({required: false})
    @IsPositive()
    @IsNumber()
    @IsOptional()
    maxAmountTrans: number;

    @ApiProperty({required: true})
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    isSetMaxAmountTrans: number;

    @ApiProperty({required: true})
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    percentageCashback: number;

    @ApiProperty({required: false})
    status: number;

    @ApiProperty({required: false})
    isDeleted: number;
}