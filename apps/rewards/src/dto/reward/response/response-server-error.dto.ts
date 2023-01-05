import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base.response.dto';

export class ResponseServerErrorDto extends BaseResponseDto {
  @ApiProperty({ example: 500 })
  statusCode: number;

  @ApiProperty({ example: 'Internal server error' })
  message: string;
}