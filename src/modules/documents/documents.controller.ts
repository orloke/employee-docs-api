import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Document } from 'src/modules/documents/entities/document.entity';
import { IDocumentService } from './interfaces/documents-service.interface';
import { CreateManyDocumentDto } from './dto/create-many-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: IDocumentService) {}

  @Post()
  @ApiOperation({ summary: 'Create one or more documents' })
  @ApiCreatedResponse({ type: Document, isArray: true })
  @ApiConflictResponse({ description: 'Document already exists' })
  create(@Body() body: CreateManyDocumentDto) {
    if (Array.isArray(body.documents) && body.documents.length > 1) {
      return this.documentsService.createMany(body.documents);
    }

    return this.documentsService.create(body.documents[0]);
  }

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(+id);
  }
}
