import { Controller, Get, Query } from '@nestjs/common';
import { GetStockDto } from './dto/get-stock.dto';
import { StockResponse } from './interfaces/stock-response.interface';
import { StockService } from './stock.service';

@Controller('stocks')
export class StockController {
  constructor(private readonly service: StockService) {}

  @Get()
  async getStock(@Query() params: GetStockDto): Promise<StockResponse> {
    return await this.service.getStockQuote(params);
  }
}
