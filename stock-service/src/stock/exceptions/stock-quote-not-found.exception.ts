import { HttpException, HttpStatus } from '@nestjs/common';

export class StockQuoteNotFound extends HttpException {
  constructor(code: string) {
    super(`Stock quote (${code}) not found`, HttpStatus.NOT_FOUND);
  }
}
