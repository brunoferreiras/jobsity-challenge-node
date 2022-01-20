import { GetStockDto } from '../dto/get-stock.dto';
import { StockResponse } from './stock-response.interface';

export interface ExternalService {
  getStockQuote(dto: GetStockDto): Promise<StockResponse>;
}
