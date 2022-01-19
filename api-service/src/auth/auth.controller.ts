import { Controller, Body, Post, Get, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthenticationDto } from './dto/authentication.dto';
import { TokenModel } from './interfaces/auth.interface';
import { UserEntity } from '../users/entities/user.entity';
import { AuthUser } from './decorators/auth-user.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() authenticationDto: AuthenticationDto,
  ): Promise<TokenModel> {
    return await this.authService.login(authenticationDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  getMe(@AuthUser() user: UserEntity): any {
    return user;
  }
}
