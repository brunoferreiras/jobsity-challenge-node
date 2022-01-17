import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import {
  mockCSVExternalResponse,
  mockGetStockDto,
  mockStockResponse,
} from '../../../test/helpers';
import { StoopService } from './stoop.service';
import { StockResponse } from '../interfaces/stock-response.interface';
import { ResponseTypes } from '../enums/responses.type';

describe('StoopService', () => {
  let service: StoopService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [StoopService],
    }).compile();

    service = module.get<StoopService>(StoopService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStockQuote using JSON', () => {
    it('should be made request to api service with correct params', async () => {
      const result: AxiosResponse = {
        data: {
          symbols: [
            {
              symbol: 'A.US',
              date: '2022-01-14',
              time: '22:03:50',
              open: 144.04,
              high: 145.15,
              low: 142.36,
              close: 144.68,
              volume: 2225442,
              name: 'AGILENT TECHNOLOGIES',
            },
          ],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      const spyHttpService = jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(result));
      await service
        .setExternalResponseType(ResponseTypes.JSON)
        .getStockQuote(mockGetStockDto());
      expect(spyHttpService).toHaveBeenCalledWith(
        `https://stooq.com/q/l/?f=sd2t2ohlcvn&h&s=${
          mockGetStockDto().code
        }&e=json`,
      );
    });

    it('should be return StockResponse incomplete when service not found', async () => {
      const result: AxiosResponse = {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      jest.spyOn(httpService, 'get').mockImplementation(() => of(result));
      const response = await service
        .setExternalResponseType(ResponseTypes.JSON)
        .getStockQuote(mockGetStockDto());
      expect(response).toEqual({
        code: undefined,
        name: undefined,
      } as StockResponse);
    });

    it('should be return StockResponse when service success', async () => {
      const result: AxiosResponse = {
        data: {
          symbols: [
            {
              symbol: 'A.US',
              date: '2022-01-14',
              time: '22:03:50',
              open: 144.04,
              high: 145.15,
              low: 142.36,
              close: 144.68,
              volume: 2225442,
              name: 'AGILENT TECHNOLOGIES',
            },
          ],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      jest.spyOn(httpService, 'get').mockImplementation(() => of(result));
      const response = await service
        .setExternalResponseType(ResponseTypes.JSON)
        .getStockQuote(mockGetStockDto());
      expect(response).toEqual(mockStockResponse());
    });
  });

  describe('getStockQuote using CSV', () => {
    it('should be made request to api service with correct params', async () => {
      const result: AxiosResponse = {
        data: mockCSVExternalResponse(),
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      const spyHttpService = jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(result));
      await service.getStockQuote(mockGetStockDto());
      expect(spyHttpService).toHaveBeenCalledWith(
        `https://stooq.com/q/l/?f=sd2t2ohlcvn&h&s=${
          mockGetStockDto().code
        }&e=csv`,
      );
    });

    it('should be return StockResponse incomplete when service not found', async () => {
      const result: AxiosResponse = {
        data: `Symbol,Date,Time,Open,High,Low,Close,Volume,Name
any,N/D,N/D,N/D,N/D,N/D,N/D,N/D,any
`,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      jest.spyOn(httpService, 'get').mockImplementation(() => of(result));
      const response = await service.getStockQuote(mockGetStockDto());
      expect(response).toEqual({
        code: 'any',
        close: 'N/D',
        date: 'N/D',
        high: 'N/D',
        low: 'N/D',
        name: 'any',
        open: 'N/D',
        time: 'N/D',
        volume: 'N/D',
      } as any);
    });

    it('should be return StockResponse when service success', async () => {
      const result: AxiosResponse = {
        data: mockCSVExternalResponse(),
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      jest.spyOn(httpService, 'get').mockImplementation(() => of(result));
      const response = await service.getStockQuote(mockGetStockDto());
      expect(response).toEqual(mockStockResponse());
    });
  });
});
