import { CreateDocumentDto } from "src/modules/documents/dto/create-document.dto";
import { Document } from "src/modules/documents/entities/document.entity";
import { FindOneOptions } from "typeorm";

export abstract class IDocumentsRepository {
  abstract create(documentData: CreateDocumentDto): Promise<Document>;
  abstract findOne(where: FindOneOptions<Document>): Promise<Document | null>;
  abstract findAll(): Promise<Document[]>;
}
