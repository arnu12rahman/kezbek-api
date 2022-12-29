import { DatabaseModule, RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from 'apps/transactions/src/schemas/transaction.schema';
import { TransactionsRepository } from 'apps/transactions/src/transactions.repository';
import * as Joi from 'joi';
import { CashbacksController } from './cashbacks.controller';
import { CashbacksRepository } from './cashbacks.repository';
import { CashbacksService } from './cashbacks.service';
import { Cashback, CashbackSchema } from './schemas/cashback.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_CASHBACK_QUEUE: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        PORT_CASHBACKS: Joi.number().required()
      }),
      envFilePath: './apps/.env'
    }),
    DatabaseModule,
    MongooseModule.forFeature([{name: Transaction.name, schema: TransactionSchema},{name: Cashback.name, schema: CashbackSchema}]),
    RmqModule
  ],
  controllers: [CashbacksController],
  providers: [CashbacksService, TransactionsRepository, CashbacksRepository],
})
export class CashbacksModule { }
