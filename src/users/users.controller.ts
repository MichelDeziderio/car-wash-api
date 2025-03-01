import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Users } from "src/interfaces/users/users.interface";
import { CreateUserDto } from "./dtos/create-user.dto";
import { validationParamsPipe } from "src/pipes/validation-params.pipe";

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
}