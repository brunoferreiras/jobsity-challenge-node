import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { StockService } from '../src/stock/stock.service';
import { StockModule } from '../src/stock/stock.module';
import { mockStockResponse } from './helpers';

describe('Stocks', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [StockModule],
    })
      .overrideProvider(StockService)
      .useValue({
        getStockQuote: jest.fn().mockResolvedValue(mockStockResponse()),
      })
      .compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api/v1');
    await app.init();
  });

  describe('/GET /api/v1/stocks', () => {
    it('should be return a stocks from code', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/api/v1/stocks?code=A.US')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(body).toEqual(mockStockResponse());
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
