import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { IDocumentTypesService } from './interfaces/documents-service.interface';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';

@Controller('document-types')
export class DocumentTypesController {
  constructor(private readonly documentTypesService: IDocumentTypesService) {}

  @Post()
  create(@Body() createDocumentTypeDto: CreateDocumentTypeDto) {
    return this.documentTypesService.create(createDocumentTypeDto);
  }

  @Get()
  findAll() {
    return this.documentTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDocumentTypeDto: UpdateDocumentTypeDto) {
    return this.documentTypesService.update(+id, updateDocumentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentTypesService.remove(+id);
  }
}
