import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../mail/mail.module';
import { StocksModule } from '../stocks/stocks.module';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UsersRepository]),
    ConfigModule,
    StocksModule,
    MailModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
