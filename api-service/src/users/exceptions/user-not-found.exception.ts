import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFound extends HttpException {
  constructor(email: string) {
    super(`User (${email}) not found`, HttpStatus.NOT_FOUND);
  }
}
