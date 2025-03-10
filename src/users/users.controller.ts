import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Users } from "src/interfaces/users/users.interface";
import { CreateUserDto } from "./dtos/create-user.dto";
import { validationParamsPipe } from "src/pipes/validation-params.pipe";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Controller('api/v1/users')
export class UsersController {

  constructor(private readonly users: UsersService) { }

  @Get()
  async listUsers(): Promise<Users[]> {
    return await this.users.findAll();
  }

  @Get('/:_id')
  async findOne(@Param('_id', validationParamsPipe) _id: string): Promise<Users> {
    return await this.users.findOne(_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUser: CreateUserDto): Promise<Users> {
      return await this.users.createUser(createUser);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateUser(@Body() updateUser: UpdateUserDto, @Param('_id', validationParamsPipe) _id: string): Promise<void> {
      return await this.users.updateUser(_id, updateUser);
  }
}