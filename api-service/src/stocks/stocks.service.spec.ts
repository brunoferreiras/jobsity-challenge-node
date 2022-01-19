import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { StocksRepository } from './stocks.repository';
import { StocksService } from './stocks.service';
import { HttpModule } from '@nestjs/axios'

describe('StocksService', () => {
  let service: StocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        StocksService,
        { provide: StocksRepository, useValue: { registerRequest: jest.fn() }},
        { provide: ConfigService, useValue: { get: jest.fn() }}
      ],
    }).compile();

    service = module.get<StocksService>(StocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
