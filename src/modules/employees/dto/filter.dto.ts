import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { DocumentTypeName } from 'src/modules/document-types/enums/document-type-name.enum';
import { DocumentStatus } from 'src/modules/documents/enums/document-status.enum';

export class FilterDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  document?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page?: number = 1;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number = 10;

  @ApiProperty({ required: false, enum: DocumentTypeName })
  @IsOptional()
  @IsString()
  documentType?: DocumentTypeName;

  @ApiProperty({ required: false, enum: DocumentStatus })
  @IsOptional()
  @IsString()
  status?: DocumentStatus;
}
