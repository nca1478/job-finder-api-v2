import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { UsersRepository } from './repositories/users.repository';
import { UserEntity } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersRepository.create(createUserDto);
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.findAll();
  }

  findOne(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }

  findOneByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOneByEmail(email);
  }

  findOneWithPassword(email: string): Promise<UserEntity> {
    return this.usersRepository.findOneWithPassword(email);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string): Promise<UserEntity> {
    return this.usersRepository.remove(id);
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

    const token = await this.authService.createJwtToken({ ...user });

    return {
      ...user,
      token,
    };
  }
}
