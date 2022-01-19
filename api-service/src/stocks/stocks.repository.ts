import { EntityRepository, Repository } from 'typeorm';
import { StockEntity } from './entities/stock.entity';

@EntityRepository(StockEntity)
export class StocksRepository extends Repository<StockEntity> {}
