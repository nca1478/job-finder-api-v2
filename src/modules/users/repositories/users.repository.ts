import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.usersRepo.create(createUserDto);

    return await this.usersRepo.save(newUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
