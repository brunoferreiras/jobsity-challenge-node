import { Test, TestingModule } from '@nestjs/testing';
import { mockUser } from '../../test/helpers';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let userMock: UserEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRepository],
    }).compile();
    repository = module.get<UsersRepository>(UsersRepository);
    userMock = mockUser();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getByEmail()', () => {
    it('should be called findOne with correct params', async () => {
      repository.findOne = jest.fn().mockResolvedValue({});
      await repository.getByEmail(userMock.email);
      expect(repository.findOne).toBeCalledWith({ email: userMock.email });
    });

    it('should be returns when findOne returns', async () => {
      repository.findOne = jest.fn().mockResolvedValue(userMock);
      expect(await repository.getByEmail('any_email')).toEqual(userMock);
    });
  });

  describe('getById()', () => {
    it('should be called findOne with correct params', async () => {
      repository.findOne = jest.fn().mockResolvedValue({});
      await repository.getById('any_id');
      expect(repository.findOne).toBeCalledWith('any_id');
    });

    it('should be returns when findOne returns', async () => {
      repository.findOne = jest.fn().mockResolvedValue(userMock);
      expect(await repository.getById('any_id')).toEqual(userMock);
    });
  });
});
