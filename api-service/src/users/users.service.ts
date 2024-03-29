import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as MD5 from 'crypto-js/md5';
import { UserResponse } from './interfaces/user-response.interface';
import { UserEntity } from './entities/user.entity';
import { UserNotFound } from './exceptions/user-not-found.exception';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  private async generatePassword(password: string): Promise<string> {
    return await hash(password, this.configService.get('bcrypt.salt'));
  }

  private generateRandomPassword(): string {
    return MD5(Date.now().toString()).toString();
  }

  public async createUser(dto: CreateUserDto): Promise<UserResponse> {
    const password = this.generateRandomPassword();
    const hashedPassword = await this.generatePassword(password);
    const user = this.repository.create({
      ...dto,
      password: hashedPassword,
    });
    const created = await this.repository.save(user);
    return { email: created.email, password: password };
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.getByEmail(email);
    if (!user) {
      throw new UserNotFound(email);
    }
    return user;
  }

  public async findById(id: string): Promise<UserEntity> {
    const user = await this.repository.getById(id);
    if (!user) {
      throw new UserNotFound(id);
    }
    return user;
  }

  public async recoverPassword(email: string): Promise<any> {
    const user = await this.findByEmail(email);
    const password = this.generateRandomPassword();
    const hashedPassword = await this.generatePassword(password);
    await this.repository.update(user.id, { password: hashedPassword });
    this.mailService.sendEmailWithNewPassword(email, password);
  }
}
