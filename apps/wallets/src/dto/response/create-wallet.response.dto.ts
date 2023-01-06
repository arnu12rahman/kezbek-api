import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base.response.dto';
import { WalletDto } from '../core/wallet.dto';

export class CreateWalletResponseDto extends BaseResponseDto {
  constructor(statusCode: number, message: string, data: WalletDto) {
    super(statusCode, message);
    this.data = data;
  }

  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Create new wallet data successfully' })
  message: string;

  @ApiProperty({ type: WalletDto })
  data: WalletDto;
}