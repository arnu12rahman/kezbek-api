import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name)
  constructor(private readonly mailService: MailerService) { }

  async sendNotif(data: any) {
    await this.mailService.sendMail({
      from: 'arnu12rahman@gmail.com',
      to: data.transData.customerEmail,
      subject: "[Kezbek Info] - Congratulations, You're Getting Cashback",
      template: 'mail',
      context: {
        cashback: data.transData
      },
    })
  }
}
