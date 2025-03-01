import { Model } from 'mongoose';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './dtos/create-user.dto';
import { Users } from 'src/interfaces/users/users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private readonly usersModel: Model<Users>) { }

  async findAll() {
    return await this.usersModel.find().select('-password').exec();
  }

  async findOne(_id: string): Promise<any> {
    const findUser = await this.usersModel.findOne({ _id }).select('-password').exec();

    if (!findUser) {
        throw new BadRequestException(`Usuário com o id ${_id} não encontrado!`);
    }
    
    return findUser;
}

  async createUser(createUser: CreateUserDto): Promise<Users> {

    const { plate, owner } = createUser;

    const jogadorEncontrado = await this.usersModel.findOne({ plate }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(`Usuário com nome ${owner} e placa ${plate} já cadastrado!`);
    }

    const jogadorCriado = new this.usersModel(createUser);
    return await jogadorCriado.save();

  }
}