import { Model } from 'mongoose';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transactions } from 'src/interfaces/transactions/transaction.interface';
import { TransactionsDto } from './dtos/create-transacitions';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel('transactions') private readonly transactionsModel: Model<Transactions>) { }

  async findAll() {
    return await this.transactionsModel.find().exec()
  }

  async findOne(_id: string): Promise<any> {
    const findTransaction = await this.transactionsModel.findOne({ _id }).select('-password').exec();

    if (!findTransaction) {
      throw new BadRequestException(`Transação com o id ${_id} não encontrada!`);
    }

    return findTransaction;
  }

  async create(createTransactions: TransactionsDto): Promise<Transactions> {
    const createdTransaction = new this.transactionsModel(createTransactions);
    return await createdTransaction.save();
  }

  async updateTransaction(_id: string, updateTransaction: TransactionsDto): Promise<void> {

    const findTransaction = await this.transactionsModel.findOne({ _id }).select('-password').exec();

    if (!findTransaction) {
      throw new BadRequestException(`Transação com o id ${_id} não encontrada!`);
    }

    await this.transactionsModel.findOneAndUpdate({ _id }, { $set: updateTransaction }).exec();

  }
}