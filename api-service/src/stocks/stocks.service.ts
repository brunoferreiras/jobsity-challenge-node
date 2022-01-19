import { Injectable } from '@nestjs/common';
import { StockResponse } from './interfaces/stock-response.interface';
import { HttpService } from '@nestjs/axios'
import { StocksRepository } from './stocks.repository';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StocksService {
  private endpoint: string;
  constructor(
    private readonly repository: StocksRepository,
    private readonly httpService: HttpService,
    configService: ConfigService
  ) {
    this.endpoint = `${configService.get<string>('stocks_service.url')}/stocks`
  }

  public async getStock (code: string): Promise<StockResponse> {
    const url = `${this.endpoint}?code=${code}`;
    const observable = this.httpService.get(url);
    const response = await lastValueFrom(observable);
    return this.parseResponse(response.data)
  }

  private parseResponse(data: any): StockResponse {
    return {
      name: data.name,
      symbol: data.code,
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
    }
  }
}
