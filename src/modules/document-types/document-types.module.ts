import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentTypeRepository } from './document-type.repository';
import { DocumentTypesController } from './document-types.controller';
import { DocumentTypesService } from './document-types.service';
import { DocumentType } from './entities/document-type.entity';
import { IDocumentsTypesRepository } from './interfaces/documents-repository.interface';
import { IDocumentTypesService } from './interfaces/documents-service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentType])],
  controllers: [DocumentTypesController],
  providers: [
    {
      provide: IDocumentTypesService,
      useClass: DocumentTypesService,
    },
    {
      provide: IDocumentsTypesRepository,
      useClass: DocumentTypeRepository,
    },
  ],
})
export class DocumentTypesModule {}
