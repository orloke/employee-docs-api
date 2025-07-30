import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { FiltersDto } from './dto/filters.dto';
import { User } from './entities/user.entity';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { IUsersService } from './interfaces/users-service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  public async findOne(filters?: FiltersDto): Promise<User | null> {
    const response = await this.usersRepository.findOne({
      where: { ...filters },
    });
    console.log('🚀 ~ UsersService ~ findOne ~ response:', filters);
    return response;
  }

  public async findAll(filters?: FiltersDto): Promise<User[]> {
    const response = await this.usersRepository.findAll({
      where: { ...filters },
    });
    return response;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const response = await this.usersRepository.findByEmail(email);
    return response;
  }
}
