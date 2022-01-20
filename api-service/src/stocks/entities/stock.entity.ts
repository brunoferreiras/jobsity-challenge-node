import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity('stocks')
export class StockEntity {
  @ObjectIdColumn()
  @Transform(({ value }) => { return value.toString() }, { toPlainOnly: true })
  id?: ObjectID;

  @Column()
  @ApiProperty({ description: 'The name of the stock' })
  name: string;

  @Column()
  @ApiProperty({ description: 'The code of the stock' })
  symbol: string;

  @Column()
  @ApiProperty({ description: 'The open of the stock' })
  open: string;

  @Column()
  @ApiProperty({ description: 'The high of the stock' })
  high: string;

  @Column()
  @ApiProperty({ description: 'The low of the stock' })
  low: string;

  @Column()
  @ApiProperty({ description: 'The close of the stock' })
  close: string;

  @Column()
  @ApiProperty({ description: 'The user_id of the stock' })
  user_id: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'The date of creation of the stock register' })
  created_at: Date

  @UpdateDateColumn()
  @ApiProperty({ description: 'The date of updating of the stock register' })
  updated_at: Date
}
