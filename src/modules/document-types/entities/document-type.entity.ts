import { Document } from 'src/modules/documents/entities/document.entity';
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DocumentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Document, (document) => document.documentType)
  documents: Document[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
