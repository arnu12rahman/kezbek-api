import { Module } from '@nestjs/common';
import { AuthModule, RmqModule } from '@app/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import * as dotenv from 'dotenv'
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_NOTIFICATION_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/notifications/.env'
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.PASS_MAIL
        }
      },
      template: {
        dir: join(__dirname, 'mails'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      }
    }),
    RmqModule,
    AuthModule
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule { }
