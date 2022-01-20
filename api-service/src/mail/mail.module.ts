import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailProcessor } from './mail.processor';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          transport: {
            host: config.get('mail.host'),
            port: config.get('mail.port'),
            secure: false,
            // tls: { ciphers: 'SSLv3', }, // gmail
            auth: false,
          },
          defaults: {
            from: config.get('mail.from'),
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    BullModule.registerQueueAsync({
      name: 'mailer',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
          password: configService.get('redis.password'),
        },
      }),
    }),
  ],
  controllers: [],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
