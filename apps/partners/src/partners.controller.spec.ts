import { Test, TestingModule } from '@nestjs/testing';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';

describe('PartnersController', () => {
  let partnersController: PartnersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PartnersController],
      providers: [PartnersService],
    }).compile();

    partnersController = app.get<PartnersController>(PartnersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(partnersController.getHello()).toBe('Hello World!');
    });
  });
});
