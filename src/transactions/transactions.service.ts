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
    const findTransaction = await this.transactionsModel.findOne({ _id }).exec();

    if (!findTransaction) {
      throw new BadRequestException(`Transação com o id ${_id} não encontrada!`);
    }

    return findTransaction;
  }

  async findByDate(date: string): Promise<any> {

    if (!date) {
      throw new BadRequestException('A data é obrigatória!');
    }

    const startDate = new Date(date);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    endDate.setHours(endDate.getHours() + 21);

    const transactions = await this.transactionsModel.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).exec();

    if (!transactions.length) {
      throw new BadRequestException(`Nenhuma transação encontrada para a data ${date}!`);
    }

    return transactions;
  }

  async create(createTransactions: TransactionsDto): Promise<Transactions> {
    const createdTransaction = new this.transactionsModel(createTransactions);
    return await createdTransaction.save();
  }

  async updateTransaction(_id: string, updateTransaction: TransactionsDto): Promise<void> {

    const findTransaction = await this.transactionsModel.findOne({ _id }).exec();

    if (!findTransaction) {
      throw new BadRequestException(`Transação com o id ${_id} não encontrada!`);
    }

    await this.transactionsModel.findOneAndUpdate({ _id }, { $set: updateTransaction }).exec();

  }
}