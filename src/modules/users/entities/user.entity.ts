import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { UserModel, roleEnum } from '../models/user.model';
import { ColumnCommonEntity } from '../../../common/entities/column-common.entity';

@Entity('users')
export class UserEntity extends ColumnCommonEntity implements UserModel {
  @Column()
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
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

  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return;
    }
    this.id = randomUUID();
  }

  @BeforeInsert()
  setRole() {
    if (this.role) {
      return;
    }
    this.role = roleEnum.user;
  }

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
