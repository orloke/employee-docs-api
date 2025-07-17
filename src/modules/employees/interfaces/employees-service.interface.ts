import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { FilterDto } from '../dto/filter.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee } from '../entities/employee.entity';

export abstract class IEmployeesService {
  abstract create(employee: CreateEmployeeDto): Promise<Employee>;
  abstract findOne(id: number): Promise<Employee>;
  abstract findAll(filters?: FilterDto): Promise<{
    data: Employee[];
    pagination: {
      totalItems: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>;
  abstract update(
    id: number,
    employee: UpdateEmployeeDto,
  ): Promise<Employee | null>;
  abstract remove(id: number): Promise<{ message: string }>;
}
