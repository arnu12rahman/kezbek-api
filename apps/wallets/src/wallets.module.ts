import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import * as Joi from 'joi';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schemas/wallet.schema';
import { WalletsRepository } from './wallets.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_WALLET_QUEUE: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        PORT_WALLETS: Joi.number().required()
      }),
      envFilePath: './apps/.env'
    }),
    DatabaseModule,
    MongooseModule.forFeature([{name: Wallet.name, schema: WalletSchema}]),
    RmqModule,
    AuthModule
  ],
  controllers: [WalletsController],
  providers: [WalletsService, WalletsRepository],
})
export class WalletsModule {}
