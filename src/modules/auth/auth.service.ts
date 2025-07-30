import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { IUsersService } from '../users/interfaces/users-service.interface';
import { IAuthService } from './interfaces/auth-service.interface';
import { IPayload } from './types/payload';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: IUsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Email ou senha inválidos');
  }

  async login(user: User) {
    const payload:IPayload = { id: user.id, email: user.email, name: user.name };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
