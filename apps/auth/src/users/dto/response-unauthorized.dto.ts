import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base.response.dto';

export class ResponseUnauthorizedDto extends BaseResponseDto {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({
    example: ['Credentials are not valid.'],
  })
  message: string[];

  @ApiProperty({ example: 'Unauthorized' })
  error: string;
}