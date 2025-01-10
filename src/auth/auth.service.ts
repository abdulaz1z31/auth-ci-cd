/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { VerifyDto } from './dto/verify-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mailer/mailer.service';
import { OtpService } from 'src/otp/otp.service';
import { HashingService } from 'src/hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailService: MailService,
    private otpService: OtpService,
    private hasingService: HashingService,
  ) {}
  async register(userData: RegisterAuthDto) {
    return userData;
  }
  async verify(verifyData: VerifyDto) {
    return verifyData;
  }
  async login(loginData: LoginAuthDto) {
    return loginData;
  }
}
