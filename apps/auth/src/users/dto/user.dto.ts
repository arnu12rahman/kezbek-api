import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator"

export class UserDto {
    @IsNotEmpty()
    _id: any

    @ApiProperty({required: true})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({required: true})
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}