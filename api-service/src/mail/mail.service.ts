import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

export class MailService {
  constructor(
    @InjectQueue('mailer')
    private mailQueue: Queue,
  ) {}

  async sendEmailWithNewPassword(
    email: string,
    password: string,
  ): Promise<boolean> {
    try {
      await this.mailQueue.add('resend-password', {
        email,
        password,
      });
      return true;
    } catch (error) {
      console.error(`Error queueing confirmation email to user ${email}`);
      return false;
    }
  }
}
