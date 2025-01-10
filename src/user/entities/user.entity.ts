import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../user.helpers';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: Roles.user })
  role: Roles;
}
