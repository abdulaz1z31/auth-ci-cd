import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { OtpModule } from 'src/otp/otp.module';
import { MailModule } from 'src/mailer/mailer.module';
import { HashingModule } from 'src/hashing/hashing.module';
import { GuardModule } from 'src/guard/guard.module';

@Module({
  imports: [UserModule, OtpModule, MailModule, HashingModule, GuardModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
