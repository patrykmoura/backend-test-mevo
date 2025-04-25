import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionModule } from './transaction/transaction.module';
import { AppConfigModule } from './app-config/app-config.module';

@Module({
  imports: [
    AppConfigModule,
    PrismaModule,
    TransactionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
