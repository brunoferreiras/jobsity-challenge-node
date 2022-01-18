import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, Index, ObjectID, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  @Index({ unique: true })
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Column()
  type: string;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
