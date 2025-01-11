/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { VerifyDto } from './dto/verify-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mailer/mailer.service';
import { OtpService } from 'src/otp/otp.service';
import { HashingService } from 'src/hashing/hashing.service';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { login, verify } from './auth.types';
import { TokenService } from 'src/guard/token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepositry: Repository<User>,
    private userService: UserService,
    private mailService: MailService,
    private otpService: OtpService,
    private hashingService: HashingService,
    private tokenService: TokenService,
  ) {}
  async register(userData: RegisterAuthDto): Promise<User> {
    const check = await this.userService.chechByEmail(userData.email);
    if (!check) {
      throw new ConflictException('User already exists');
    }
    const hashPassword = await this.hashingService.generate(userData.password);
    userData.password = hashPassword;
    const user = await this.userService.create(userData);
    const code = this.otpService.generateOtp();
    const optData = {
      user_id: user.id,
      code,
      expire_time: new Date(Date.now() + 3 * 60 * 1000),
    };
    await Promise.all([
      this.otpService.create(optData),
      this.mailService.sendMessage(
        user.email,
        'One time password for verify',
        code,
      ),
    ]);
    delete user.password;
    return user;
  }
  async verify(verifyData: VerifyDto): Promise<verify> {
    const otpdata = await this.otpService.findOne(verifyData.user_id);
    if (!otpdata) {
      throw new BadRequestException('Otpdata not found');
    }
    if (otpdata.code != verifyData.otp) {
      throw new BadRequestException('Otp is wrong');
    }
    const now = new Date(Date.now());
    if (now > otpdata.expire_time) {
      await this.otpService.delete(otpdata.user_id);
      throw new HttpException('Otp expired', 410);
    }
    await Promise.all([
      await this.userService.update(otpdata.user_id, { is_active: true }),
      await this.otpService.delete(otpdata.user_id),
    ]);
    return {
      message: 'User virified',
      statusCode: 201,
    };
  }
  async login(loginData: LoginAuthDto): Promise<login> {
    const user = await this.userService.findByEmail(loginData.email);
    if (!user.is_active) {
      throw new UnauthorizedException('User not verefied');
    }
    const isPasswordTrue = this.hashingService.compare(
      loginData.password,
      user.password,
    );
    if (!isPasswordTrue) {
      throw new BadRequestException('Email or password are not valid ');
    }
    const payload = {
      id: user.id,
      is_active: user.is_active,
      role: user.role,
    };
    const accessToken = this.tokenService.createAccessToken(payload);
    const refreshToken = this.tokenService.createRefreshToken(payload);
    return {
      message: 'Logged in successfully',
      token: {
        accessToken,
        refreshToken,
      },
    };
  }
}
