import { RmqService } from '@app/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from '../notifications.controller';
import { NotificationsService } from '../notifications.service';
import { transactionSub } from './stubs/notification.stub';

describe('NotificationsController', () => {
  let notificationService: NotificationsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [NotificationsService, RmqService, ConfigService, MailerService],
    }).compile();

    notificationService = moduleRef.get<NotificationsService>(NotificationsService);
    jest.clearAllMocks();
  });

  describe('handleSendNotification',() => {
    describe('when handleSendNotification is called', () => {
      test('then it should call calculateCashback from cashbacksService', () => {
        expect(notificationService.sendNotif).toBeCalledWith(transactionSub())
      })
    })
  })
});
