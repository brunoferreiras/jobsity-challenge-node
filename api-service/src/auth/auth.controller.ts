import {
  Controller,
  Body,
  Post,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthenticationDto } from './dto/authentication.dto';
import { TokenModel } from './interfaces/auth.interface';
import { UserEntity } from '../users/entities/user.entity';
import { AuthUser } from './decorators/auth-user.decorator';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Get access token' })
  @ApiOkResponse({ description: 'Access token' })
  @ApiUnauthorizedResponse({
    description: "When the user does not exist or password doesn't match.",
  })
  async login(
    @Body() authenticationDto: AuthenticationDto,
  ): Promise<TokenModel> {
    return await this.authService.login(authenticationDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  @ApiOperation({ summary: 'Get user info' })
  @ApiOkResponse({ type: UserEntity })
  @ApiBearerAuth()
  getMe(@AuthUser() user: UserEntity): any {
    return user;
  }
}
