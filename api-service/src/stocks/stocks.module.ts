import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './entities/stock.entity';
import { StocksRepository } from './stocks.repository';
import { StocksController } from './stocks.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockEntity, StocksRepository]),
    HttpModule
  ],
  controllers: [StocksController],
  providers: [StocksService]
})
export class StocksModule { }
