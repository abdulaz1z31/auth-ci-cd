import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';

@Module({
  imports: [OtpModule],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
