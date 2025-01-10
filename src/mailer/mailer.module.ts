import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';

@Module({
  imports: [MailModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
