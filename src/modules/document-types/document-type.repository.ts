import { Injectable } from "@nestjs/common";
import { IDocumentsTypesRepository } from "./interfaces/documents-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository, UpdateResult } from "typeorm";
import { CreateDocumentTypeDto } from "./dto/create-document-type.dto";
import { DocumentType } from "./entities/document-type.entity";
import { UpdateDocumentTypeDto } from "./dto/update-document-type.dto";

@Injectable()
  export class DocumentTypeRepository implements IDocumentsTypesRepository {
    constructor(
      @InjectRepository(DocumentType)
      private readonly documentTypeRepository: Repository<DocumentType>,
    ) {}


    public async create(documentData: CreateDocumentTypeDto): Promise<DocumentType> {
      const data =  await this.documentTypeRepository.save(documentData);
      return data;
    }

    public async findOne(where: FindOneOptions<DocumentType>): Promise<DocumentType | null> {
      return await this.documentTypeRepository.findOne(where);
    }

    public async findAll(): Promise<DocumentType[]> {
      return await this.documentTypeRepository.find();
    }

    public async update(id: number, documentData: UpdateDocumentTypeDto): Promise<DocumentType | null> {
      await this.documentTypeRepository.update(id, documentData);
      return await this.findOne({ where: { id } });
    }

    public async softDelete(id: number): Promise<UpdateResult> {
      return await this.documentTypeRepository.softDelete(id);
    }


  }
