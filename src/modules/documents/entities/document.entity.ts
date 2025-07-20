import { DocumentType } from "src/modules/document-types/entities/document-type.entity";
import { Employee } from "src/modules/employees/entities/employee.entity";
import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DocumentStatus } from "../enums/document-status.enum";

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column({
    type: 'enum',
    enum: DocumentStatus,
    default: DocumentStatus.ACTIVE,
  })
  status: DocumentStatus;

  @ManyToOne(() => Employee, (employee) => employee.documents)
  employee: Employee;

  @ManyToOne(() => DocumentType, (type) => type.documents)
  documentType: DocumentType;
}
