import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { MailerService } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv'
dotenv.config();
@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name)
  constructor(private readonly mailService: MailerService) { }

  async sendNotif(data: any) {
    await this.mailService.sendMail({
      from: process.env.USER_MAIL,
      to: data.transData.customerEmail,
      subject: "[Kezbek Info] - Congratulations, You're Getting Cashback",
      template: 'mail',
      context: {
        cashback: data.transData
      },
    })

    return "send mail success"
  }
}
