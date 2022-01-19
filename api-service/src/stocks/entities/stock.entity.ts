import { Transform } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity('stocks')
export class StockEntity {
  @ObjectIdColumn()
  @Transform(({ value }) => { return value.toString() }, { toPlainOnly: true })
  id?: ObjectID;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column()
  open: string;

  @Column()
  high: string;

  @Column()
  low: string;

  @Column()
  close: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
