import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { IEmployeesRepository } from './interfaces/employees-repository.interface';

@Injectable()
export class EmployeesRepository implements IEmployeesRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
  ) {}
  async create(employeeData: CreateEmployeeDto): Promise<Employee> {
    return await this.employeesRepository.save(employeeData);
  }

  async findOne(where: FindOneOptions<Employee>): Promise<Employee | null> {
    return await this.employeesRepository.findOne(where);
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeesRepository.find();
  }

  async update(
    id: number,
    employee: UpdateEmployeeDto,
  ): Promise<Employee | null> {
    await this.employeesRepository.update(id, employee);
    return await this.employeesRepository.findOne({ where: { id } });
  }

  async softDelete(id: number) {
    return await this.employeesRepository.softDelete(id);
  }

  async findAndCount(
    options: FindManyOptions<Employee>,
  ): Promise<[Employee[], number]> {
    return await this.employeesRepository.findAndCount(options);
  }

  async findOneWithDeleted(
    where: FindOneOptions<Employee>,
  ): Promise<Employee | null> {
    return await this.employeesRepository.findOne({
      ...where,
      withDeleted: true,
    });
  }

  async findWithFilters(
    filters: FilterDto ={},
  ): Promise<[Employee[], number]> {
    const { page = 1, limit = 10, name, document, documentType, status } = filters;

    const qb = this.employeesRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.documents', 'document')
      .leftJoinAndSelect('document.documentType', 'documentType');

    if (name) {
      qb.andWhere('employee.name ILIKE :name', { name: `%${name}%` });
    }

    if (document) {
      qb.andWhere('employee.document LIKE :document', {
        document: `%${document}%`,
      });
    }

    if (documentType) {
      qb.andWhere('documentType.name = :documentType', { documentType });
    }

    if (status) {
      qb.andWhere('document.status = :status', { status });
    }

    qb.take(limit).skip((page - 1) * limit);
    qb.orderBy('employee.name', 'ASC');

    return qb.getManyAndCount();
  }
}
