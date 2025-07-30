import { CreateUserDto } from '../dto/create-user.dto';
import { FiltersDto } from '../dto/filters.dto';
import { User } from '../entities/user.entity';

export abstract class IUsersService {
  abstract create(userData: CreateUserDto): Promise<User>;
  abstract findOne(where?: FiltersDto): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(filters?: FiltersDto): Promise<User[]>;
}
