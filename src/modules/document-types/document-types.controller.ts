import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { IDocumentTypesService } from './interfaces/documents-service.interface';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';

@Controller('document-types')
export class DocumentTypesController {
  constructor(private readonly documentTypesService: IDocumentTypesService) {}

  @Post()
  async create(@Body() createDocumentTypeDto: CreateDocumentTypeDto) {
    return await this.documentTypesService.create(createDocumentTypeDto);
  }

  @Get()
  async findAll() {
    return await this.documentTypesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.documentTypesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDocumentTypeDto: UpdateDocumentTypeDto) {
    return await this.documentTypesService.update(+id, updateDocumentTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.documentTypesService.remove(+id);
  }
}
