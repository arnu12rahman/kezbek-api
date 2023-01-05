import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base.response.dto';
import { RewardDto } from '../core/reward.dto';

export class CreateRewardResponseDto extends BaseResponseDto {
  constructor(statusCode: number, message: string, data: RewardDto) {
    super(statusCode, message);
    this.data = data;
  }

  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Create new reward data successfully' })
  message: string;

  @ApiProperty({ type: RewardDto })
  data: RewardDto;
}