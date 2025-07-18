import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { IDocumentsRepository } from './interfaces/documents-repository.interface';

@Injectable()
export class DocumentsRepository implements IDocumentsRepository {
  constructor(
    @InjectRepository(Document)
    private readonly documentsRepository: Repository<Document>,
  ) {}

  async create(documentData: any): Promise<any> {
    return await this.documentsRepository.create(documentData);
  }

  async findOne(where: any): Promise<any> {
    return await this.documentsRepository.findOne(where);
  }

  async findAll(): Promise<any> {
    return await this.documentsRepository.find();
  }
}
