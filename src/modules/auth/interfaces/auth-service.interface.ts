import { User } from "src/modules/users/entities/user.entity";

export abstract class IAuthService {
  abstract login(user: Omit<User, 'password'>): Promise<{ token: string }>;
  abstract validateUser(
    email: string,
    password: string,
  ): Promise<{ id: number; email: string; name: string }>;
}
