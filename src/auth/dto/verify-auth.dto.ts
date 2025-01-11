import { IsNotEmpty } from 'class-validator';

export class VerifyDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  otp: string;
}
