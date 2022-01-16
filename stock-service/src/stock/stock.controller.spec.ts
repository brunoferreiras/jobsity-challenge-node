import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

describe('StockController', () => {
  let stockController: StockController;

  beforeEach(async () => {
    const stock: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [StockService],
    }).compile();

    stockController = stock.get<StockController>(StockController);
  });

  describe('getStock', () => {
    it('should return "Hello World!"', () => {
      expect(stockController.getStock()).toBe('Hello World!');
    });
  });
});
