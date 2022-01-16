import { Injectable } from '@nestjs/common';

@Injectable()
export class StockService {
  getStockQuote (): string {
    return 'Hello World!';
  }
}
