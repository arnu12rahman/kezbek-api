import { Test, TestingModule } from '@nestjs/testing';
import { CashbacksController } from './cashbacks.controller';
import { CashbacksService } from './cashbacks.service';

describe('CashbacksController', () => {
  let cashbacksController: CashbacksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CashbacksController],
      providers: [CashbacksService],
    }).compile();

    cashbacksController = app.get<CashbacksController>(CashbacksController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cashbacksController.getHello()).toBe('Hello World!');
    });
  });
});
