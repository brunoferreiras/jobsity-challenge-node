import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { StocksService } from 'src/stocks/stocks.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserResponse } from './interfaces/user-response.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private readonly stocksService: StocksService
  ) { }

  @Post('register')
  @HttpCode(201)
  async register (@Body() dto: CreateUserDto): Promise<UserResponse> {
    return await this.service.createUser(dto);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async history (@AuthUser() user: UserEntity): Promise<UserResponse> {
    return await this.stocksService.getHistory(user.id);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async stats (@AuthUser() user: UserEntity): Promise<UserResponse> {
    return await this.stocksService.getStats(user.id);
  }
}
