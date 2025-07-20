import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { DocumentTypeName } from '../enums/document-type-name.enum';


export class CreateDocumentTypeDto {
  @ApiProperty({
    description: 'Nome do tipo de documento (ex: CPF, Carteira de Trabalho)',
    enum: DocumentTypeName,
    example: DocumentTypeName.CPF,
  })
  @IsEnum(DocumentTypeName)
  @IsNotEmpty()
  name: DocumentTypeName;
}
