import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/interfaces/users/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule { };