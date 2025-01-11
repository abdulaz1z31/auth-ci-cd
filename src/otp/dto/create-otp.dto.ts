import { IsNotEmpty } from 'class-validator';

export class CreateOtpDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  expire_time: Date;
}
