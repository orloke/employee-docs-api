import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class FiltersDto {
  @ApiProperty({ required: false, example: 'john.doe@gmail.com', description: 'User email' })
  @IsEmail()
  @IsOptional()
  email?: string;
}
