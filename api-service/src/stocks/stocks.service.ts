import { Injectable } from '@nestjs/common';
import { StockResponse } from './interfaces/stock-response.interface';
import { HttpService } from '@nestjs/axios'
import { StocksRepository } from './stocks.repository';

@Injectable()
export class StocksService {
  constructor(
    private readonly repository: StocksRepository,
    private readonly httpService: HttpService,
  ) {}

  public getStock (code: string): Promise<StockResponse> {
    return null
  }
}
