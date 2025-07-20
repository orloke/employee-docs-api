import { UpdateResult } from 'typeorm';
import { CreateDocumentTypeDto } from '../dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from '../dto/update-document-type.dto';
import { DocumentType } from '../entities/document-type.entity';

export abstract class IDocumentTypesService {
  abstract create(documentData: CreateDocumentTypeDto): Promise<DocumentType>;
  abstract findOne(id: number): Promise<DocumentType | null>;
  abstract findAll(): Promise<DocumentType[] | null>;
  abstract update(id: number, documentData: UpdateDocumentTypeDto): Promise<DocumentType | null>;
  abstract remove(id: number): Promise<{message: string}>;
}
