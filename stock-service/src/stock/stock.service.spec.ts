import { HttpModule } from '@nestjs/axios';
import { ServiceUnavailableException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockGetStockDto, mockStockResponse } from '../../test/helpers';
import { ExternalServiceUnavailableException } from './exceptions/external-service-unavailable.exception';
import { StockQuoteNotFoundException } from './exceptions/stock-quote-not-found.exception';
import { StoopService } from './external/stoop.service';
import { ExternalService } from './interfaces/external-service.interface';
import { StockService } from './stock.service';

describe('StockService', () => {
  let service: StockService;
  let externalServiceMock: ExternalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        StockService,
        { provide: StoopService, useValue: { getStockQuote: jest.fn() } },
      ],
    }).compile();

    service = module.get<StockService>(StockService);
    externalServiceMock = module.get<StoopService>(StoopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStockQuote', () => {
    it('should be called external service with correct params', async () => {
      jest
        .spyOn(externalServiceMock, 'getStockQuote')
        .mockResolvedValue(mockStockResponse());
      await service.getStockQuote(mockGetStockDto());
      expect(externalServiceMock.getStockQuote).toHaveBeenCalledWith(
        mockGetStockDto(),
      );
    });

    it('should be throw ExternalServiceUnavailableException when external service fails', async () => {
      jest
        .spyOn(externalServiceMock, 'getStockQuote')
        .mockRejectedValue(new ServiceUnavailableException());
      await expect(service.getStockQuote(mockGetStockDto())).rejects.toThrow(
        new ExternalServiceUnavailableException(),
      );
    });

    it('should be throw StockQuoteNotFoundException when external service not found quote', async () => {
      jest
        .spyOn(externalServiceMock, 'getStockQuote')
        .mockResolvedValue({ code: 'any_code' } as any);
      await expect(service.getStockQuote(mockGetStockDto())).rejects.toThrow(
        new StockQuoteNotFoundException(mockGetStockDto().code),
      );
    });

    it('should be throw StockQuoteNotFoundException when external service not found quote', async () => {
      jest
        .spyOn(externalServiceMock, 'getStockQuote')
        .mockResolvedValue({ code: 'any_code' } as any);
      await expect(service.getStockQuote(mockGetStockDto())).rejects.toThrow(
        new StockQuoteNotFoundException(mockGetStockDto().code),
      );
    });

    it('should return StockResponse when external service returns', async () => {
      jest
        .spyOn(externalServiceMock, 'getStockQuote')
        .mockResolvedValue(mockStockResponse());
      expect(await service.getStockQuote(mockGetStockDto())).toEqual(
        mockStockResponse(),
      );
    });
  });
});
