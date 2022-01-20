import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { StocksService } from '../stocks/stocks.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationParams } from './dto/pagination-params.dto';
import { UserEntity } from './entities/user.entity';
import { UserResponse } from './interfaces/user-response.interface';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private readonly stocksService: StocksService,
  ) {}

  @Post('register')
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  async register(@Body() dto: CreateUserDto): Promise<UserResponse> {
    return await this.service.createUser(dto);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiBearerAuth('User')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async history(
    @AuthUser() user: UserEntity,
    @Query() { page, limit }: PaginationParams,
  ): Promise<UserResponse> {
    return await this.stocksService.getHistory(user.id, page, limit);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(200)
  @Roles(Role.SuperUser)
  @ApiBearerAuth('SuperUser')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async stats(@AuthUser() user: UserEntity): Promise<UserResponse> {
    return await this.stocksService.getStats(user.id);
  }

  @Post('recoverPassword')
  @HttpCode(204)
  async recoverPassword(@Body() body: any): Promise<any> {
    await this.service.recoverPassword(body.email);
  }
}
