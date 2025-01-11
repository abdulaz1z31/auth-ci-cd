import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';

@Module({
  imports: [OtpModule, TypeOrmModule.forFeature([Otp])],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
