import { HttpException, HttpStatus } from '@nestjs/common';

export class StockQuoteNotFoundException extends HttpException {
  constructor(code: string) {
    super(`Stock quote (${code}) not found`, HttpStatus.NOT_FOUND);
  }
}
