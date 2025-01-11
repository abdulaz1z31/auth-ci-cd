import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OtpService {
  constructor(@InjectRepository(Otp) private otpRepsitory: Repository<Otp>) {}
  generateOtp() {
    const digits = '0123456789';
    let str = '';
    for (let i = 0; i <= 5; i++) {
      str += digits[Math.floor(Math.random() * digits.length)];
    }
    return str;
  }
  async create(otpData: CreateOtpDto) {
    return await this.otpRepsitory.save(otpData);
  }
  async delete(user_id: number) {
    const otp = await this.otpRepsitory.findOneBy({ user_id });
    if (Object.keys(otp).length == 0) {
      throw new BadRequestException('Otp not found');
    }
    await this.otpRepsitory.delete({ user_id });
  }
  async findOne(user_id: number) {
    return await this.otpRepsitory.findOneBy({ user_id });
  }
}
