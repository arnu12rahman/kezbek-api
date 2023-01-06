import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { CreateUserRequest } from './dto/create-user.request';
import { ResponseExistDto } from './dto/response-already-exist.dto';
import { ResponseOkDto } from './dto/response-ok.dto';
import { UsersService } from './users.service';

@ApiTags('Auth')
@Controller('auth/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOkResponse({type: ResponseOkDto})
  @ApiUnprocessableEntityResponse({type: ResponseExistDto})
  async createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }
}
