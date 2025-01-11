import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'abdulaziz.user777@gmail.com',
          pass: 'zybykrodnvzyxwtn',
        },
        port: 587,
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
