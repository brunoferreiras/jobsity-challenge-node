import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class GetStockDto {
  @ApiProperty({ description: 'Stock code' })
  @IsString()
  @IsDefined()
  code: string;
}
