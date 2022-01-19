import { Exclude, Transform } from 'class-transformer';
import { Column, CreateDateColumn, Entity, Index, ObjectID, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn()
  @Transform(({ value }) => { return value.toString() }, { toPlainOnly: true })
  _id?: ObjectID;

  @Column()
  @Index({ unique: true })
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Column()
  type: string;

  get id(): string {
    return this._id.toHexString()
  }

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
