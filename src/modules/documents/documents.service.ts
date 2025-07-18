import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Document } from 'src/modules/documents/entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { IDocumentsRepository } from './interfaces/documents-repository.interface';
import { IDocumentService } from './interfaces/documents-service.interface';

@Injectable()
export class DocumentsService implements IDocumentService {
  constructor(private readonly documentsService: IDocumentsRepository) {}

  public async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    if (createDocumentDto.value) {
      createDocumentDto.value = createDocumentDto.value.replace(/\D/g, '');
    }

    const findDocument = await this.documentsService.findOne({
      where: { value: createDocumentDto.value },
    });

    if (findDocument) {
      throw new ConflictException('Document already exists in database');
    }

    return await this.documentsService.create(createDocumentDto);
  }

  public async findAll(): Promise<Document[] | null> {
    return await this.documentsService.findAll();
  }

  public async findOne(id: number): Promise<Document | null> {
    const document = await this.documentsService
      .findOne({ where: { id }, relations: ['employee'] })
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    return document;
  }
}
