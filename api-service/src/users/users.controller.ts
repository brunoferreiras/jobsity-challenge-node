import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './interfaces/user-response.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() dto: CreateUserDto): Promise<UserResponse> {
    return await this.service.createUser(dto);
  }
}
