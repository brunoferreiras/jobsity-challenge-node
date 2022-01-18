import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationDto } from './dto/authentication.dto';
import { TokenModel } from './interfaces/auth.interface';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async validateUser (email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const isMatchPassword = await compare(pass, user?.password)
    if (user && isMatchPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login (authDto: AuthenticationDto): Promise<TokenModel> {
    const user = await this.validateUser(authDto.email, authDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user.id,
    };
    const expiresIn = this.configService.get('jwt.expiresIn')
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      expires_in: expiresIn,
    };
  }
}
