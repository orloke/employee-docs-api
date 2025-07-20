import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from '../employees/employees.module';
import { Employee } from '../employees/entities/employee.entity';
import { DocumentsController } from './documents.controller';
import { DocumentsRepository } from './documents.repostitory';
import { DocumentsService } from './documents.service';
import { Document } from './entities/document.entity';
import { IDocumentsRepository } from './interfaces/documents-repository.interface';
import { IDocumentService } from './interfaces/documents-service.interface';
import { DocumentType } from '../document-types/entities/document-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Employee, DocumentType]), EmployeesModule],
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
