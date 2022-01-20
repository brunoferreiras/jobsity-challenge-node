import { UserEntity } from '../../src/users/entities/user.entity';

export const mockUser = (type: string = 'user'): UserEntity => ({
  email: 'any_email',
  password: 'any_hash',
  type,
  created_at: new Date('2020-11-21T18:48:12.872Z'),
  updated_at: new Date('2020-11-21T18:48:12.872Z'),
  id: 'any_id',
});
