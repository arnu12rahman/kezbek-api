import { JwtAuthGuard, RmqService } from '@app/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Controller,UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService,  private readonly rmqService: RmqService) {}

  @EventPattern('send_notification')
  async handleSendNotification(@Payload() data: any, @Ctx() context?: RmqContext){
    this.notificationsService.sendNotif(data)
    if(context)
      this.rmqService.ack(context)
  }
}
