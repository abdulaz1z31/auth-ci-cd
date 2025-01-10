import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Roles } from '../user.helpers';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  role: Roles;
}
