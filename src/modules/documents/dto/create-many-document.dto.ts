import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDocumentDto } from './create-document.dto';

export class CreateManyDocumentDto {
  @ApiProperty({ type: [CreateDocumentDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentDto)
  documents: CreateDocumentDto[];
}
