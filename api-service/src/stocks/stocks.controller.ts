import { Controller, Get, Query } from '@nestjs/common';
import { GetStockDto } from './dto/get-stock.dto';
import { StockResponse } from './interfaces/stock-response.interface';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly service: StocksService) { }

  @Get()
  async getStock (@Query() params: GetStockDto): Promise<StockResponse> {
    return await this.service.getStock(params.q);
  }
}
