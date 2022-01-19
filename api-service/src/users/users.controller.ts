import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(200)
  @Roles(Role.SuperUser)
  async stats (@AuthUser() user: UserEntity): Promise<UserResponse> {
    return await this.stocksService.getStats(user.id);
  }
}
