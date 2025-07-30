import { FindOneOptions } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export abstract class IUsersRepository {
  abstract create(userData: CreateUserDto): Promise<User>;
  abstract findOne(where: FindOneOptions<User>): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(where: FindOneOptions<User>): Promise<User[]>;
}
