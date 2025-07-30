import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUsersRepository } from './interfaces/users-repository.interface';

export class UserRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(userData: User): Promise<User> {
    return await this.usersRepository.save(userData);
  }

  async findOne(where: any): Promise<User | null> {
    return await this.usersRepository.findOne(where);
  }

  async findAll(where: FindManyOptions<User>): Promise<User[]> {
    return await this.usersRepository.find(where);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
