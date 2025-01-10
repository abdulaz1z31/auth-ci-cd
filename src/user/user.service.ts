import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { deleteUser, updateUserType } from './user.helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepositry: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepositry.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepositry.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepositry.findOneBy({ id });
    if (Object.keys(user).length == 0) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepositry.findOneBy({ email });
    if (Object.keys(user).length == 0) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<updateUserType> {
    const user = await this.userRepositry.findOneBy({ id });
    if (Object.keys(user).length == 0) {
      throw new BadRequestException('User not found');
    }
    await this.userRepositry.update(id, updateUserDto);
    const newUser = await this.userRepositry.findOneBy({ id });
    return {
      message: 'updated',
      user: newUser,
    };
  }

  async remove(id: number): Promise<deleteUser> {
    const user = await this.userRepositry.findOneBy({ id });
    if (Object.keys(user).length == 0) {
      throw new BadRequestException('User not found');
    }
    return { message: 'deleted' };
  }
}
