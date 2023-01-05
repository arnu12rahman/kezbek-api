import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base.response.dto';
import { CashbackDto } from '../core/cashback.dto';

export class CreateCachbackResponseDto extends BaseResponseDto {
  constructor(statusCode: number, message: string, data: CashbackDto) {
    super(statusCode, message);
    this.data = data;
  }

  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Create new cashback data successfully' })
  message: string;

  @ApiProperty({ type: CashbackDto })
  data: CashbackDto;
}