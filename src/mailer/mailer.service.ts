import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailrService: MailerService) {}
  async sendMessage(to: string, subject: string, body: string) {
    try {
      await this.mailrService.sendMail({
        to,
        subject,
        text: body,
      });
      console.log('message sended');
    } catch (error) {
      throw new Error(error);
    }
  }
}
