import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class FilterDto {
  @ApiProperty({
    description: 'Nome do tipo de documento (ex: CPF, Carteira de Trabalho)',
    example: 'CPF',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  name?: string;
}
