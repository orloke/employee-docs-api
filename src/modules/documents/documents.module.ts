import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsController } from './documents.controller';
import { DocumentsRepository } from './documents.repostitory';
import { DocumentsService } from './documents.service';
import { IDocumentsRepository } from './interfaces/documents-repository.interface';
import { IDocumentService } from './interfaces/documents-service.interface';
import { Document } from './entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  controllers: [DocumentsController],
  providers: [
    {
      provide: IDocumentService,
      useClass: DocumentsService,
    },
    {
      provide: IDocumentsRepository,
      useClass: DocumentsRepository,
    },
  ],
})
export class DocumentsModule {}
