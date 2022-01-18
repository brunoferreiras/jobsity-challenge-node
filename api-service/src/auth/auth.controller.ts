import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthenticationDto } from './dto/authentication.dto';
import { TokenModel } from './interfaces/auth.interface';
import { UserEntity } from '../users/entities/user.entity';
import { AuthUser } from '../common/decorators/auth-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() authenticationDto: AuthenticationDto,
  ): Promise<TokenModel> {
    return await this.authService.login(authenticationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@AuthUser() user: UserEntity): any {
    return user;
  }
}
