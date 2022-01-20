import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { StoopService } from './external/stoop.service';

@Module({
  imports: [HttpModule],
  providers: [StockService, StoopService],
  controllers: [StockController],
})
export class StockModule {}
