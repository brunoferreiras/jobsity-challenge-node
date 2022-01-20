import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { Column, CreateDateColumn, Entity, Index, ObjectID, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn()
  @Transform(({ value }) => { return value.toString() }, { toPlainOnly: true })
  _id?: ObjectID;

  @Column()
  @Index({ unique: true })
  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @Exclude()
  @Column({ select: false })
  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @Column()
  @ApiProperty({ description: 'The type of the user' })
  type: string;

  get id(): string {
    return this._id.toHexString()
  }

  @CreateDateColumn()
  @ApiProperty({ description: 'The date of creation of the user' })
  created_at: Date

  @UpdateDateColumn()
  @ApiProperty({ description: 'The date of updating of the user' })
  updated_at: Date
}
