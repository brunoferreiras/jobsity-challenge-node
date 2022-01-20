import { HttpException, HttpStatus } from '@nestjs/common';

export class ExternalServiceUnavailableException extends HttpException {
  constructor() {
    super(`External service unavailable`, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
