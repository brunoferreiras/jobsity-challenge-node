import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mongodb',
          host: config.get('database.host'),
          port: config.get('database.port'),
          database: config.get('database.database'),
          username: config.get('database.username'),
          password: config.get('database.password'),
          authSource: 'admin',
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          useNewUrlParser: true,
          synchronize: true,
          keepConnectionAlive: true,
          useUnifiedTopology: true,
        }
      },
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
