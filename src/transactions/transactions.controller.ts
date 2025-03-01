import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsDto } from './dtos/create-transacitions';
import { validationParamsPipe } from 'src/pipes/validation-params.pipe';

@Controller('api/v1/transactions')
export class TransactionsController {
  constructor(private readonly transactions: TransactionsService) {}

  @Post()
  async create(@Body() transactionsDto: TransactionsDto) {
    return await this.transactions.create(transactionsDto);
  }

  @Get()
  async findAll() {
    return await this.transactions.findAll();
  }

  @Get('/:_id')
  async findOne(@Param('_id') _id: string) {
    return await this.transactions.findOne(_id);
  }

  @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updateTransaction(@Body() updateTransaction: TransactionsDto, @Param('_id', validationParamsPipe) _id: string): Promise<void> {

        await this.transactions.updateTransaction(_id, updateTransaction);

    }
}
