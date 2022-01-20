import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';

@Processor('mailer')
export class MailProcessor {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(
        job.data,
      )}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.debug(
      `Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(
        result,
      )}`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process('resend-password')
  async sendEmailWithNewPassword(
    job: Job<{ email: string; password: string }>,
  ): Promise<any> {
    this.logger.log(`Sending confirmation email to '${job.data.email}'`);
    try {
      const result = await this.mailerService.sendMail({
        subject: 'Resend Password',
        to: job.data.email,
        template: '/app/src/mail/templates/resend_password',
        context: {
          email: job.data.email,
          newPassword: job.data.password,
        },
      });
      return result;
    } catch (error) {
      this.logger.error(
        `Failed to send confirmation email to '${job.data.email}'`,
        error.stack,
      );
      throw error;
    }
  }
}
