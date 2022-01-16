import { Controller, Get } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller()
export class StockController {
  constructor(private readonly service: StockService) { }

  @Get()
  getStock (): string {
    return this.service.getStockQuote();
  }
}
