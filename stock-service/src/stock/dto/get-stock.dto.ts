import { IsDefined, IsEnum, IsString } from 'class-validator';
import { ResponseTypes } from '../enums/responses.type';

export class GetStockDto {
  @IsString()
  @IsDefined()
  code: string;
  @IsEnum(ResponseTypes)
  type: string;
}
