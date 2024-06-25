import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { UsersRepository } from './repositories/users.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.repository.create(createUserDto);
  }

  findAll(): Promise<UserEntity[]> {
    return this.repository.findAll();
  }

  findOne(id: string): Promise<UserEntity> {
    return this.repository.findOne(id);
  }

  findOneByEmail(email: string): Promise<UserEntity> {
    return this.repository.findOneByEmail(email);
  }

  findOneWithPassword(email: string): Promise<UserEntity> {
    return this.repository.findOneWithPassword(email);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.repository.update(id, updateUserDto);
  }

  remove(id: string): Promise<UserEntity> {
    return this.repository.remove(id);
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.findOneWithPassword(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException(
        'Credenciales no validas (email o password)',
      );
    }

    delete user.password;

    return user;
  }
}
