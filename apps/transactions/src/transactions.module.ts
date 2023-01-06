import { DatabaseModule, RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { CASHBACK_SERVICE, NOTIFICATION_SERVICE, PARTNER_SERVICE, REWARD_SERVICE, WALLET_SERVICE } from './constants/service';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required()
      }),
      envFilePath: './apps/.env'
    }),
    DatabaseModule,
    MongooseModule.forFeature([{name: Transaction.name, schema: TransactionSchema}]),
    RmqModule.register({name: CASHBACK_SERVICE}),
    RmqModule.register({name: REWARD_SERVICE}),
    RmqModule.register({name: NOTIFICATION_SERVICE}),
    RmqModule.register({name: PARTNER_SERVICE}),
    RmqModule.register({name: WALLET_SERVICE}),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository],
})
export class TransactionsModule {}
