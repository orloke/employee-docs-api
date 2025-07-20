import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { DocumentType } from './entities/document-type.entity';
import { IDocumentsTypesRepository } from './interfaces/documents-repository.interface';
import { IDocumentTypesService } from './interfaces/documents-service.interface';

@Injectable()
export class DocumentTypesService implements IDocumentTypesService {
  constructor(
    private readonly documentTypesRepository: IDocumentsTypesRepository,
  ) {}

  public async create(
    createDocumentTypeDto: CreateDocumentTypeDto,
  ): Promise<DocumentType> {
    return await this.documentTypesRepository.create(createDocumentTypeDto);
  }

  public async findAll() {
    return await this.documentTypesRepository.findAll();
  }

  public async findOne(id: number): Promise<DocumentType | null> {
    return await this.documentTypesRepository.findOne({ where: { id } });
  }

  public async update(
    id: number,
    documentData: CreateDocumentTypeDto,
  ): Promise<DocumentType | null> {
    return await this.documentTypesRepository.update(id, documentData);
  }

  public async remove(id: number): Promise<{ message: string }> {
    const documentType = await this.documentTypesRepository.findOne({
      where: { id },
    });

    if (!documentType) {
      throw new NotFoundException('Document type not found');
    }

    await this.documentTypesRepository.softDelete(id);

    return { message: 'Document type deleted successfully' };
  }
}
