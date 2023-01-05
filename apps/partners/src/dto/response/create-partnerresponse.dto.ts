import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base.response.dto';
import { PartnerDto } from '../core/partner.dto';

export class CreatePartnerResponseDto extends BaseResponseDto {
  constructor(statusCode: number, message: string, data: PartnerDto) {
    super(statusCode, message);
    this.data = data;
  }

  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Create new partner data successfully' })
  message: string;

  @ApiProperty({ type: PartnerDto })
  data: PartnerDto;
}