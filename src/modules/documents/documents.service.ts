import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'src/modules/documents/entities/document.entity';
import { Employee } from '../employees/entities/employee.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { IDocumentsRepository } from './interfaces/documents-repository.interface';
import { IDocumentService } from './interfaces/documents-service.interface';
import { IDocumentsTypesRepository } from '../document-types/interfaces/documents-repository.interface';
import { IEmployeesRepository } from '../employees/interfaces/employees-repository.interface';
import { DocumentStatus } from './enums/document-status.enum';
import { DocumentType } from '../document-types/entities/document-type.entity';

@Injectable()
export class DocumentsService implements IDocumentService {
  constructor(
    private readonly documentRepository: IDocumentsRepository,
    @InjectRepository(Employee)
    private readonly employeeRepository: IEmployeesRepository,
    @InjectRepository(DocumentType)
    private readonly documentTypeRepository: IDocumentsTypesRepository,
  ) {}

  public async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    const { employeeId, documentTypeId, value, status } = createDocumentDto;

    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const documentType = await this.documentTypeRepository.findOne({
      where: { id: documentTypeId },
    });

    if (!documentType) {
      throw new NotFoundException('Document type not found');
    }

    const cleanValue = value?.replace(/\D/g, '');

    const existing = await this.documentRepository.findOne({
      where: {
        value: cleanValue,
        employee: { id: employeeId },
        documentType: { id: documentTypeId },
      },
    });

    if (existing) {
      throw new ConflictException('This document already exists for this employee');
    }

    // ✅ Criação direta da entidade
    const document = new Document();
    document.value = cleanValue;
    document.status = status ?? DocumentStatus.ACTIVE;
    document.employee = employee;
    document.documentType = documentType;

    return await this.documentRepository.create(document);
  }

  public async findAll(): Promise<Document[] | null> {
    return await this.documentRepository.findAll();
  }

  public async findOne(id: number): Promise<Document | null> {
    const document = await this.documentRepository
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
