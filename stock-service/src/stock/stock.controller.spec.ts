import { Test, TestingModule } from '@nestjs/testing';
import { GetStockDto } from './dto/get-stock.dto';
import { StockResponse } from './interfaces/stock-response.interface';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { HttpModule } from '@nestjs/axios';
import { StockQuoteNotFoundException } from './exceptions/stock-quote-not-found.exception';
import { ExternalServiceUnavailableException } from './exceptions/external-service-unavailable.exception';
import { mockGetStockDto } from '../../test/helpers';

describe('StockController', () => {
  let controller: StockController;
  let service: StockService;
  let mockResponse: StockResponse;
  let mockDto: GetStockDto;

  beforeEach(async () => {
    const stockModule: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [StockController],
      providers: [
        { provide: StockService, useValue: { getStockQuote: jest.fn() } },
      ],
    }).compile();

    controller = stockModule.get<StockController>(StockController);
    service = stockModule.get<StockService>(StockService);
    mockResponse = {
      name: 'AGILENT TECHNOLOGIES',
      date: '2022-01-14',
      time: '22:03:50',
      open: 144.04,
      high: 145.15,
      close: 144.68,
      code: 'A.US',
      low: 142.36,
      volume: 2225442,
    };
    mockDto = mockGetStockDto();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStock', () => {
    it('should call service with correct values', () => {
      const dto: GetStockDto = {
        code: 'a.us',
      };
      const spy = jest.spyOn(service, 'getStockQuote');
      controller.getStock(dto);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should be throw ExternalServiceUnavailableException when service fails', async () => {
      jest
        .spyOn(service, 'getStockQuote')
        .mockRejectedValue(new ExternalServiceUnavailableException());
      await expect(controller.getStock(mockDto)).rejects.toThrow(
        new ExternalServiceUnavailableException(),
      );
    });

    it('should be throw StockQuoteNotFound when service not found', async () => {
      jest
        .spyOn(service, 'getStockQuote')
        .mockRejectedValue(new StockQuoteNotFoundException('any_code'));
      await expect(controller.getStock(mockDto)).rejects.toThrow(
        new StockQuoteNotFoundException('any_code'),
      );
    });

    it('should return StockResponse when service returns', async () => {
      jest.spyOn(service, 'getStockQuote').mockResolvedValue(mockResponse);
      expect(await controller.getStock(mockDto)).toEqual(mockResponse);
    });
  });
});
