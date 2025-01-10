import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';

@Injectable()
export class OtpService {
  async generateOtp() {
    const digits = '0123456789';
    let str = '';
    for (let i = 0; i <= 5; i++) {
      str += digits[Math.floor(Math.random() * digits.length)];
    }
    return str;
  }
  async create(otpData: CreateOtpDto) {
    return otpData;
  }
  async delete(otpData: CreateOtpDto) {
    return otpData;
  }
  async findOne(username: string) {
    return username;
  }
}
