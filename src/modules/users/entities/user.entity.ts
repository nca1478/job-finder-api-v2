import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserModel, roleEnum } from '../models/user.model';

@Entity('users')
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column({ type: 'enum', enum: roleEnum, default: roleEnum.user })
  role: roleEnum;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.email = this.email.toLowerCase().trim();
  }
}
