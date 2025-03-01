import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsSchema } from 'src/interfaces/transactions/transaction.schema';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [
    MongooseModule.forFeature([{ name: 'transactions', schema: TransactionsSchema }]),
  ],
  exports: [
    TransactionsService
  ]
})
export class TransactionsModule { };