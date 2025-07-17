import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    example: 'John Doe',
    required: true,
    description: 'Employee name',
    minLength: 3,
    maxLength: 200,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  name: string;

  @ApiProperty({
    description: 'Employee document CPF (somente números)',
    example: '12345678901',
    minLength: 11,
    maxLength: 11,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  document: string;

  @ApiProperty({
    example: '2023-01-01',
    required: true,
    description: 'Employee hired date',
  })
  @IsString()
  hiredAt: Date;
}
