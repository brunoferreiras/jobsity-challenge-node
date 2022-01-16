import { GetStockDto } from '../../src/stock/dto/get-stock.dto';
import { StockResponse } from '../../src/stock/interfaces/stock-response.interface';

export const mockStockResponse = (): StockResponse => ({
  name: 'AGILENT TECHNOLOGIES',
  date: '2022-01-14',
  time: '22:03:50',
  open: 144.04,
  high: 145.15,
  close: 144.68,
  code: 'A.US',
  low: 142.36,
  volume: 2225442,
});

export const mockGetStockDto = (): GetStockDto => ({
  code: 'any',
});
