import { ApiProperty } from "@nestjs/swagger/dist/decorators"

export class ResponseOkDto {
    @ApiProperty({ example: 200 })
    _id: string

    @ApiProperty({ example: 'email@example.com' })
    email: string;

    @ApiProperty({ example: '$2b$10$RDCbEp3DLVwQX9lVnZOxLOtZc3Og3jK18K3ewu3vHmIIJuh/fBNvK' })
    password: string;
}