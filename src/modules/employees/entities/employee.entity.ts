import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'src/modules/documents/entities/document.entity';
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'John Doe',
    required: true,
    description: 'Employee name',
    minLength: 3,
    maxLength: 200,
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Employee document CPF (somente números)',
    example: '12345678901',
    minLength: 11,
    maxLength: 11,
    required: true,
  })
  @Column({ nullable: false, unique: true, length: 11, type: 'char' })
  document: string;

  @ApiProperty({
    example: '2023-01-01',
    required: true,
    description: 'Employee hired date',
  })
  @Column()
  hiredAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Document, (document) => document.employee)
  documents: Document[];
}
