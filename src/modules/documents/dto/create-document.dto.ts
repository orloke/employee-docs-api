import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { DocumentStatus } from '../enums/document-status.enum';

export class CreateDocumentDto {
  @ApiProperty({
    description: 'Valor do documento (ex: número do CPF, número da carteira de trabalho, etc)',
    example: '12345678901',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    description: 'Status do documento',
    enum: DocumentStatus,
    default: DocumentStatus.ACTIVE,
  })
  @IsEnum(DocumentStatus)
  @IsOptional()
  status?: DocumentStatus;

  @ApiProperty({
    description: 'ID do colaborador',
    example: 1,
  })
  @IsNumber()
  employeeId: number;

  @ApiProperty({
    description: 'ID do tipo de documento',
    example: 1,
  })
  @IsNumber()
  documentTypeId: number;
}
