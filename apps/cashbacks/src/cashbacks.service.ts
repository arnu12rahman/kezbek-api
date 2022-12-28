import { Injectable } from '@nestjs/common';

@Injectable()
export class CashbacksService {
  getHello(): string {
    return 'Hello World!';
  }
}
