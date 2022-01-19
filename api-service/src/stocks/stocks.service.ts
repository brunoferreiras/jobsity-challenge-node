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

  public async getStock (code: string, userId: string): Promise<StockResponse> {
    const url = `${this.endpoint}?code=${code}`;
    const observable = this.httpService.get(url);
    const response = await lastValueFrom(observable);
    const stock = this.parseResponse(response.data)
    this.repository.registerRequest({ ...stock, user_id: userId })
    return stock
  }

  private parseResponse (data: any): StockResponse {
    return {
      name: data.name,
      symbol: data.code,
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
    }
  }

  public async getHistory(userId: string): Promise<any> {
    return this.repository.find({
      order: { created_at: -1 },
      where: { user_id: userId }
    })
  }

  public async getStats (userId: string): Promise<any> {
    return await this.repository.aggregate([
      { $match: { user_id: userId } },
      { $group: { _id: "$symbol", quantity: { $sum: 1 } } },
      { $project: { _id: 0, stock: { $toLower: "$_id" }, times_requested: "$quantity" } },
      { $sort: { "times_requested": -1 } },
      { $limit: 5 }
    ]).toArray()
  }
}
