import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from 'apps/transactions/src/schemas/transaction.schema';
import { TransactionsRepository } from 'apps/transactions/src/transactions.repository';
import * as Joi from 'joi';
import { RewardsRepository } from './repository/rewards.repository';
import { TiersJourneyRepository } from './repository/tiers-journey.repository';
import { TiersRepository } from './repository/tiers.repository';
import { RewardsController } from './rewards.controller';
import { RewardsService } from './rewards.service';
import { Reward, RewardSchema } from './schemas/reward.schema';
import { TierJournery, TierJournerySchema } from './schemas/tier-journey.schema';
import { Tier, TierSchema } from './schemas/tier.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_REWARD_QUEUE: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        PORT_REWARDS: Joi.number().required()
      }),
      envFilePath: './apps/rewards/.env'
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      {name: Transaction.name, schema: TransactionSchema},
      {name: Reward.name, schema: RewardSchema},
      {name: Tier.name, schema: TierSchema},
      {name: TierJournery.name, schema: TierJournerySchema},
    ]),
    RmqModule,
    AuthModule
  ],
  controllers: [RewardsController],
  providers: [RewardsService, TransactionsRepository,RewardsRepository,TiersRepository, TiersJourneyRepository],
})
export class RewardsModule {}
