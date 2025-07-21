import { Document } from 'src/modules/documents/entities/document.entity';
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class DocumentType {
  @ApiProperty({
    example: 1,
    description: 'Identificador único do tipo de documento',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'CPF',
    description: 'Nome do tipo de documento. Deve ser único.',
  })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    type: () => [Document],
    description: 'Documentos associados a este tipo',
  })
  @OneToMany(() => Document, (document) => document.documentType)
  documents: Document[];

  @ApiProperty({
    example: null,
    description: 'Data de exclusão lógica, se aplicável',
    required: false,
    type: Date,
    nullable: true,
  })
  @DeleteDateColumn()
  deletedAt?: Date;
}
