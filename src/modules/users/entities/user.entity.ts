import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel, roleEnum } from '../models/user.model';

@Entity('users')
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: roleEnum, default: roleEnum.user })
  role: roleEnum;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;
}
