import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Users } from 'src/interfaces/users/users.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private readonly usersModel: Model<Users>,
  ) { }

  async findAll() {
    return await this.usersModel.find().select('-password').exec();
  }

  async findOne(_id: string): Promise<Users> {
    let findUser = await this.usersModel.findOne({ _id }).select('-password').populate("transactions").exec();

    if (!findUser) {
      throw new BadRequestException(`Usuário com o id ${_id} não encontrado!`);
    }

    return findUser;
  }

  async createUser(createUser: CreateUserDto): Promise<Users> {

    const { plate, owner } = createUser;

    const findUser = await this.usersModel.findOne({ plate }).exec();

    if (findUser) {
      throw new BadRequestException(`Usuário com nome ${owner} e placa ${plate} já cadastrado!`);
    }

    const creatUser = new this.usersModel(createUser);
    return await creatUser.save();

  }

  async updateUser(_id: string, updateUser: UpdateUserDto): Promise<void> {

    const { plate, owner } = updateUser;

    const findUser = await this.usersModel.findOne({ _id }).exec();
    if (!findUser) {
      throw new BadRequestException(`Usuário com nome ${owner} e placa ${plate} não encontrato!`);
    }

    await this.usersModel.findOneAndUpdate({ _id }, { $set: updateUser }).exec();

  }


}
