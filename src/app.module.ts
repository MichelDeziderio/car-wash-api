import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';

const urlConnect = 'mongodb+srv://user:passwoard@cluster0.d28yzvq.mongodb.net/carWash';

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
