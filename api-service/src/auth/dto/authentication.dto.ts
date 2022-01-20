import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthenticationDto {
  @ApiProperty()
  @IsString()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}
