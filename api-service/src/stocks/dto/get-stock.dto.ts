import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class GetStockDto {
  @IsString()
  @IsDefined()
  @ApiProperty()
  q: string;
}
