import { FindOneOptions, UpdateResult } from 'typeorm';
import { CreateDocumentTypeDto } from '../dto/create-document-type.dto';
import { DocumentType } from '../entities/document-type.entity';
import { UpdateDocumentTypeDto } from '../dto/update-document-type.dto';

export abstract class IDocumentsTypesRepository {
  abstract create(
    documentData: CreateDocumentTypeDto,
  ): Promise<DocumentType>;
  abstract findOne(
    where: FindOneOptions<DocumentType>,
  ): Promise<DocumentType | null>;
  abstract findAll(): Promise<DocumentType[]>;
  abstract update(id: number, documentData: UpdateDocumentTypeDto): Promise<DocumentType | null>;
  abstract softDelete(id: number): Promise<UpdateResult>;
}
