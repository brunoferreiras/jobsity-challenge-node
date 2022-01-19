import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { GetStockDto } from './dto/get-stock.dto';
import { StockResponse } from './interfaces/stock-response.interface';
import { StocksService } from './stocks.service';

@Controller('stocks')
@UseGuards(JwtAuthGuard)
export class StocksController {
  constructor(private readonly service: StocksService) { }

  @Get()
  async getStock (@Query() params: GetStockDto, @AuthUser() user: UserEntity): Promise<StockResponse> {
    return await this.service.getStock(params.q, user.id);
  }
}
