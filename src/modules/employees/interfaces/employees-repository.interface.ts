import { FindManyOptions, FindOneOptions, UpdateResult } from "typeorm";
import { Employee } from "../entities/employee.entity";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { FilterDto } from "../dto/filter.dto";

export abstract class IEmployeesRepository {
  abstract create(employeeData: CreateEmployeeDto): Promise<Employee>;
  abstract findOne(where: FindOneOptions<Employee>): Promise<Employee | null>;
  abstract findAll(): Promise<Employee[]>;
  abstract update(id: number, employee: UpdateEmployeeDto): Promise<Employee | null>;
  abstract softDelete(id: number): Promise<UpdateResult>;
  abstract findAndCount(options: FindManyOptions<Employee>): Promise<[Employee[], number]>;
  abstract findOneWithDeleted(where: FindOneOptions<Employee>): Promise<Employee | null>;
  abstract findWithFilters(filters: FilterDto): Promise<[Employee[], number]>;
}
