import { DocumentType } from "src/modules/document-types/entities/document-type.entity";
import { Employee } from "src/modules/employees/entities/employee.entity";
import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DocumentStatus } from "../enums/document-status.enum";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  value: string;

  @Column({
    type: 'enum',
    enum: DocumentStatus,
    default: DocumentStatus.ACTIVE,
  })
  @ApiProperty({ enum: DocumentStatus })
  status: DocumentStatus;

  @ApiProperty({ type: () => Employee })
  @ManyToOne(() => Employee, (employee) => employee.documents)
  employee: Employee;

  @ApiProperty({ type: () => DocumentType })
  @ManyToOne(() => DocumentType, (type) => type.documents)
  documentType: DocumentType;
}
