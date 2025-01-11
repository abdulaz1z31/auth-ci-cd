import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { VerifyDto } from './dto/verify-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from 'src/guard/guard.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('/register')
  async register(@Body() userData: RegisterAuthDto) {
    return await this.authService.register(userData);
  }

  @Public()
  @Post('/verify')
  async verify(@Body() verifyData: VerifyDto) {
    return await this.authService.verify(verifyData);
  }

  @Public()
  @Post('/login')
  async login(@Body() loginData: LoginAuthDto) {
    return await this.authService.login(loginData);
  }
}
