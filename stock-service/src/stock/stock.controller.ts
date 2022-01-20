import { Controller, Get, Query } from '@nestjs/common';
import { GetStockDto } from './dto/get-stock.dto';
import { StockResponse } from './interfaces/stock-response.interface';
import { StockService } from './stock.service';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';

@Controller('stocks')
@ApiTags('stocks')
export class StockController {
  constructor(private readonly service: StockService) {}

  @Get()
  @ApiOperation({ summary: 'Get stock quote in external api'})
  @ApiOkResponse({
    description: 'The stock quote has been successfully found.',
  })
  async getStock(@Query() params: GetStockDto): Promise<StockResponse> {
    return await this.service.getStockQuote(params);
  }
}
