import { Exclude } from 'class-transformer';
import { Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @Index({ unique: true })
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Column()
  type: string;
}
