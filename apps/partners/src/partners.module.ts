import { DatabaseModule } from '@app/common';
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
        MONGODB_URI: Joi.string().required(),
        PORT_PARTNERS: Joi.number().required()
      }),
      envFilePath: './apps/.env'
    }),
    DatabaseModule,
    MongooseModule.forFeature([{name: Partner.name, schema: PartnerSchema}]),
  ],
  controllers: [PartnersController],
  providers: [PartnersService, PartnersRepository],
})
export class PartnersModule {}
