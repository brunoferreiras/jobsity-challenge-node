import { EntityRepository, MongoRepository } from 'typeorm';
import { StockEntity } from './entities/stock.entity';

@EntityRepository(StockEntity)
export class StocksRepository extends MongoRepository<StockEntity> {
  public async registerRequest(response: any): Promise<any> {
    const stock = this.create(response);
    return await this.save(stock);
  }
}
