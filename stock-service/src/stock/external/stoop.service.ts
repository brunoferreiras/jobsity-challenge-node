import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ExternalService } from '../interfaces/external-service.interface';
import { GetStockDto } from '../dto/get-stock.dto';
import { StockResponse } from '../interfaces/stock-response.interface';

@Injectable()
export class StoopService implements ExternalService {
  private endpoint: string;
  constructor(private readonly httpService: HttpService) {
    this.endpoint = 'https://stooq.com/q/l/?f=sd2t2ohlcvn';
  }

  public async getStockQuote(dto: GetStockDto): Promise<StockResponse> {
    const url = `${this.endpoint}&s=${dto.code}&e=json`;
    const observable = this.httpService.get(url);
    const response = await lastValueFrom(observable);
    return this.parseResponse(response.data);
  }

  private parseResponse(data: any): StockResponse {
    const stock = data.symbols?.[0] || {};
    return {
      code: stock.symbol,
      date: stock.date,
      time: stock.time,
      open: stock.open,
      high: stock.high,
      low: stock.low,
      close: stock.close,
      volume: stock.volume,
      name: stock.name,
    };
  }
}
