import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base.response.dto';

export class ResponseExistDto extends BaseResponseDto {
  @ApiProperty({ example: 422 })
  statusCode: number;

  @ApiProperty({
    example: ['Email already exists.'],
  })
  message: string[];

  @ApiProperty({ example: 'Unprocessable Entity' })
  error: string;
}