import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';
import { environment } from 'environments/environments';

const urlConnect = environment.connection;

@Module({
  imports: [
    UsersModule,
    TransactionsModule,
    MongooseModule.forRoot(urlConnect),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
