import { Injectable } from "@nestjs/common";
import { IEmployeesRepository } from "./interfaces/employees-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "./entities/employee.entity";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

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

  async update(id: number, employee: UpdateEmployeeDto): Promise<Employee | null> {
    await this.employeesRepository.update(id, employee);
    return await this.employeesRepository.findOne({ where: { id } });
  }

  async softDelete(id: number) {
    return await this.employeesRepository.softDelete(id);
  }

  async findAndCount(options: FindManyOptions<Employee>): Promise<[Employee[], number]> {
    return await this.employeesRepository.findAndCount(options);

  }

  async findOneWithDeleted(where: FindOneOptions<Employee>): Promise<Employee | null> {
    return await this.employeesRepository.findOne({...where, withDeleted: true});
  }
}
