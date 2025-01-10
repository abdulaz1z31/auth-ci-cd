import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  salt = 10;
  async generate(password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt);
  }
  async compare(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
