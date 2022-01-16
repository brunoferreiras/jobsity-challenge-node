import { Test, TestingModule } from '@nestjs/testing';
import { GetStockDto } from './dto/get-stock.dto';
import { StockResponse } from './interfaces/stock-response.interface';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { HttpModule } from '@nestjs/axios';

describe('StockController', () => {
  let stockController: StockController;
  let mockResponse: StockResponse;

  beforeEach(async () => {
    const stock: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [StockController],
      providers: [StockService],
    }).compile();

    stockController = stock.get<StockController>(StockController);
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
  });

  describe('getStock', () => {
    it('should return "StockResponse"', () => {
      const dto: GetStockDto = {
        code: 'a.us',
        type: 'json',
      };
      expect(stockController.getStock(dto)).toBe(mockResponse);
    });
  });
});
