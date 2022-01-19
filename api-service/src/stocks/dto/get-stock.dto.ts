import { IsDefined, IsString } from 'class-validator';

export class GetStockDto {
  @IsString()
  @IsDefined()
  q: string;
}
