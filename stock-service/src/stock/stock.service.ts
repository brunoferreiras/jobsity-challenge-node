import { Injectable } from '@nestjs/common';
import { StockResponse } from './interfaces/stock-response.interface';
import { GetStockDto } from './dto/get-stock.dto';
import { StoopService } from './external/stoop.service';
import { ExternalServiceUnavailableException } from './exceptions/external-service-unavailable.exception';
import { StockQuoteNotFoundException } from './exceptions/stock-quote-not-found.exception';

@Injectable()
export class StockService {
  constructor(private readonly externalService: StoopService) {}

  public async getStockQuote(dto: GetStockDto): Promise<StockResponse> {
    let response: StockResponse;
    try {
      response = await this.externalService.getStockQuote(dto);
    } catch (error: any) {
      throw new ExternalServiceUnavailableException();
    }
    if (!response.name) {
      throw new StockQuoteNotFoundException(dto.code);
    }
    return response;
  }
}
