import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async getByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.findOne({ email });
  }

  async getById(id: string): Promise<UserEntity | undefined> {
    return await this.findOne(id);
  }
}
