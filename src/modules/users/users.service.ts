import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
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

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
