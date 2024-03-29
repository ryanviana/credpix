import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankController } from './bank/bank.controller';
import { BankModule } from './bank/bank.module';
import { BankService } from './bank/bank.service';
import { BankSchema } from './schemas/bank.schema';
import { WalletSchema } from './schemas/wallet.schema';
import { WalletController } from './wallets/wallets.controller.spec';
import { WalletsModule } from './wallets/wallets.module';
import { WalletService } from './wallets/wallets.service';
import { TPFtSchema } from './schemas/tpft.schema';
import { TPFtModule } from './tpft/tpft.module';
import { TpftController } from './tpft/tpft.controller';
import { TpftService } from './tpft/tpft.service';
import { SelicModule } from './selic/selic.module';
import { SelicController } from './selic/selic.controller';
import { SelicService } from './selic/selicServices/selic.service';
import { SelicProfitCalculatorService } from './selic/selicServices/selicProfitCaculator.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rgb:gruporgb@nodeexpress.ps2xp1a.mongodb.net/?retryWrites=true&w=majority',
      { dbName: 'bacen' },
    ),
    MongooseModule.forFeature([{ name: 'Bank', schema: BankSchema }]),
    MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }]),
    MongooseModule.forFeature([{ name: 'TPFt', schema: TPFtSchema }]),
    BankModule,
    WalletsModule,
    TPFtModule,
    SelicModule,
  ],
  controllers: [
    AppController,
    BankController,
    WalletController,
    TpftController,
    SelicController,
  ],
  providers: [
    AppService,
    BankService,
    WalletService,
    TpftService,
    SelicService,
    SelicProfitCalculatorService,
  ],
})
export class AppModule {}
