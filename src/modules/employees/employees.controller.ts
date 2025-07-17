import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { IEmployeesService } from './interfaces/employees-service.interface';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: IEmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'Create new employee' })
  @ApiCreatedResponse({ type: Employee })
  @ApiConflictResponse({ description: 'Employee already exists' })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @ApiOperation({ summary: 'Find all employees' })
  @ApiOkResponse({ type: [Employee] })
  @Get()
  findAll(@Query() filters?: FilterDto): Promise<{
    data: Employee[];
    pagination: {
      totalItems: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    return this.employeesService.findAll(filters);
  }

  @ApiOperation({ summary: 'Find one employee by id' })
  @ApiOkResponse({ type: Employee || null })
  @ApiNotFoundResponse({ description: 'Employee not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Employee | null> {
    return this.employeesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update employee by id' })
  @ApiOkResponse({ type: Employee || null })
  @ApiNotFoundResponse({ description: 'Employee not found' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee | null> {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @ApiOperation({ summary: 'Delete employee by id' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Employee deleted successfully',
        },
      },
    },
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.remove(id);
  }
}
