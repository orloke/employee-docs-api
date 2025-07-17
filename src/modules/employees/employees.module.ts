import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { IEmployeesService } from './interfaces/employees-service.interface';
import { IEmployeesRepository } from './interfaces/employees-repository.interface';
import { EmployeesRepository } from './employees.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [{
    provide: IEmployeesService,
    useClass: EmployeesService,
  },
  {
    provide: IEmployeesRepository,
    useClass: EmployeesRepository,
  }
],
})
export class EmployeesModule {}
