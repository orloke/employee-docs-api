import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    required: true,
    description: 'User name',
    minLength: 3,
    maxLength: 200,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john.doe@gmail.com',
    required: true,
    description: 'User email',
    minLength: 3,
    maxLength: 200,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678901',
    required: true,
    description: 'User password',
    minLength: 6,
    maxLength: 200,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
