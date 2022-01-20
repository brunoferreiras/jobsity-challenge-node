import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ExternalService } from '../interfaces/external-service.interface';
import { GetStockDto } from '../dto/get-stock.dto';
import { StockResponse } from '../interfaces/stock-response.interface';
import { ResponseTypes } from '../enums/responses.type';

@Injectable()
export class StoopService implements ExternalService {
  private endpoint: string;
  private responseType: string;

  constructor(private readonly httpService: HttpService) {
    this.endpoint = 'https://stooq.com/q/l/?f=sd2t2ohlcvn&h';
    this.responseType = ResponseTypes.CSV;
  }

  public setExternalResponseType(type: string): this {
    this.responseType = type;
    return this;
  }

  public async getStockQuote(dto: GetStockDto): Promise<StockResponse> {
    const url = `${this.endpoint}&s=${dto.code}&e=${this.responseType}`;
    const observable = this.httpService.get(url);
    const response = await lastValueFrom(observable);
    let data = response.data;
    if (this.responseType === ResponseTypes.CSV) {
      data = this.parseCSV(data);
    }
    return this.parseResponse(data);
  }

  private convertToFloatIfNumber(value: string): string | number {
    const numeric = Number(value);
    return !numeric ? value : numeric;
  }

  private parseCSV(csv: string): any {
    const lines = csv.split('\n');
    const headers = lines.shift().replace('\r', '').split(',');
    const row = lines.shift().replace('\r', '').split(',');
    const content = {};
    for (let i = 0; i < headers.length; i++) {
      content[headers[i].toLowerCase()] = this.convertToFloatIfNumber(row[i]);
    }
    return { symbols: [content] };
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
