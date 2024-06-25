import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { UserModel, roleEnum } from '../models/user.model';
import { ColumnCommonEntity } from '../../../common/entities/column-common.entity';

@Entity('users')
export class UserEntity extends ColumnCommonEntity implements UserModel {
  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { select: false })
  password: string;

  @Column({ type: 'enum', enum: roleEnum, default: roleEnum.user })
  role: roleEnum;

  @Column('text', { nullable: true })
  img: string;

  @Column('bool', { default: false })
  google: boolean;

  @Column('bool', { default: false })
  facebook: boolean;

  @Column('text', { default: null })
  tokenRecovery: string;

  @Column('date', { nullable: true })
  birthday: Date;

  @Column('varchar', { nullable: true })
  profession: string;

  @Column('varchar', { nullable: true })
  education: string;

  @Column('text', { nullable: true })
  cvUrl: string;

  @Column('varchar', { nullable: true })
  linkedinUser: string;

  @Column('varchar', { nullable: true })
  twitterUser: string;

  @Column('varchar', { nullable: true })
  instagramUser: string;

  @Column('varchar', { nullable: true })
  facebookUser: string;

  @Column('bool', { default: true })
  active: boolean;

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
