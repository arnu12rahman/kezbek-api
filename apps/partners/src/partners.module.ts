import { DatabaseModule, RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { PartnersController } from './partners.controller';
import { PartnersRepository } from './partners.repository';
import { PartnersService } from './partners.service';
import { Partner, PartnerSchema } from './schemas/partner.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_PARTNER_QUEUE: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        PORT_PARTNERS: Joi.number().required()
      }),
      envFilePath: './apps/.env'
    }),
    DatabaseModule,
    MongooseModule.forFeature([{name: Partner.name, schema: PartnerSchema}]),
    RmqModule
  ],
  controllers: [PartnersController],
  providers: [PartnersService, PartnersRepository],
})
export class PartnersModule {}
