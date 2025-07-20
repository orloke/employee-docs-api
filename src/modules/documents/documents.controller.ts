import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { IDocumentService } from './interfaces/documents-service.interface';
import { ApiOperation, ApiCreatedResponse, ApiConflictResponse } from '@nestjs/swagger';
import { Document } from 'src/modules/documents/entities/document.entity';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: IDocumentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new document type' })
  @ApiCreatedResponse({ type: Document })
  @ApiConflictResponse({description: 'Document type already exists'})
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto);
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
