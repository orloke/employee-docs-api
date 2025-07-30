import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { IAuthService } from './interfaces/auth-service.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: IAuthService) {}
  @Post('login')
  async login(@Body() login: AuthDto) {
    console.log("🚀 ~ AuthController ~ login ~ login:", login)
    const user = await this.authService.validateUser(
      login.email,
      login.password,
    );
    return await this.authService.login(user);
  }
}
