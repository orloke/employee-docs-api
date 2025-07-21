import { CreateDocumentDto } from "../dto/create-document.dto";
import { Document } from "src/modules/documents/entities/document.entity";

export abstract class IDocumentService {
  abstract create(documentData: CreateDocumentDto): Promise<Document>;
  abstract findOne(id: number): Promise<Document | null>;
  abstract findAll(): Promise<Document[] | null>;
  abstract createMany(documents: CreateDocumentDto[]): Promise<Document[]>;
}
