import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { IEmployeesRepository } from './interfaces/employees-repository.interface';
import { IEmployeesService } from './interfaces/employees-service.interface';

@Injectable()
export class EmployeesService implements IEmployeesService {
  constructor(private readonly employeesRepository: IEmployeesRepository) {}

  public async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    if (createEmployeeDto.document) {
      createEmployeeDto.document = createEmployeeDto.document.replace(
        /\D/g,
        '',
      );
    }

    const employee = await this.employeesRepository.findOneWithDeleted({
      where: { document: createEmployeeDto.document },
    });

    if (employee) {
      throw new ConflictException('Employee already exists in database');
    }

    return await this.employeesRepository.create(createEmployeeDto);
  }

  public async findAll(filters?: FilterDto): Promise<{
    data: Employee[];
    pagination: {
      totalItems: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const { page = 1, limit = 10 } = filters || { page: 1, limit: 10 };

    const [employees, totalItems] =
      await this.employeesRepository.findWithFilters(filters ?? {});

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: employees,
      pagination: {
        totalItems,
        page,
        limit,
        totalPages,
      },
    };
  }

  public async findOne(id: number): Promise<Employee> {
    const employee = await this.employeesRepository
      .findOne({ where: { id }, relations: ['documents'] })
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  public async update(
    id: number,
    employee: UpdateEmployeeDto,
  ): Promise<Employee | null> {
    const employeeToUpdate = await this.employeesRepository.findOne({
      where: { id },
    });

    if (!employeeToUpdate) {
      throw new BadRequestException('Employee not found');
    }

    await this.employeesRepository.update(id, employee);
    return await this.employeesRepository.findOne({ where: { id } });
  }

  public async remove(id: number): Promise<{ message: string }> {
    const employeeToRemove = await this.employeesRepository.findOne({
      where: { id },
    });

    if (!employeeToRemove) {
      throw new NotFoundException('Employee not found');
    }

    await this.employeesRepository.softDelete(id);

    return { message: 'Employee deleted successfully' };
  }
}
