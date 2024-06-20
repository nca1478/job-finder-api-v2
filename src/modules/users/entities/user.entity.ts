import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @Column({ nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  profession: string;

  @Column({ nullable: true })
  education: string;

  @Column({ nullable: true })
  cvUrl: string;

  @Column({ nullable: true })
  linkedinUser: string;

  @Column({ nullable: true })
  twitterUser: string;

  @Column({ nullable: true })
  instagramUser: string;

  @Column({ nullable: true })
  facebookUser: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    if (this.email) this.email = this.email.toLowerCase().trim();
  }
}
