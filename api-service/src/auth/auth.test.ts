import {
  ExecutionContext,
  HttpStatus,
  INestApplication,
  UnauthorizedException,
} from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { mockUser } from '../../test/helpers';

describe('Auth Resource', () => {
  let app: INestApplication;
  let service: AuthService;
  let mockGuard: JwtAuthGuard;

  beforeAll(async () => {
    mockGuard = {
      canActivate: (context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        req.user = mockUser();
        return true;
      },
    } as any;
    const authServiceMock = { login: jest.fn() };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .compile();
    service = moduleFixture.get<AuthService>(AuthService);
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('/api/v1');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/api/v1/auth/login', () => {
    it('should be return 401 when not authorized', async () => {
      jest
        .spyOn(service, 'login')
        .mockRejectedValue(new UnauthorizedException());
      return await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email: 'fs.brunoferreira@gmail.com', password: '123' })
        .expect(HttpStatus.UNAUTHORIZED)
        .expect({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        });
    });
  });

  describe('/api/v1/auth/me', () => {
    it('should be return user if authenticated', async () => {
      return await request(app.getHttpServer())
        .get('/api/v1/auth/me')
        .expect(HttpStatus.OK)
        .expect({
          ...mockUser(),
          created_at: '2020-11-21T18:48:12.872Z',
          updated_at: '2020-11-21T18:48:12.872Z',
        });
    });

    it('should be return 401 when not authorized', async () => {
      jest
        .spyOn(mockGuard, 'canActivate')
        .mockRejectedValue(new UnauthorizedException());
      return await request(app.getHttpServer())
        .get('/api/v1/auth/me')
        .expect(HttpStatus.UNAUTHORIZED)
        .expect({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        });
    });
  });
});
