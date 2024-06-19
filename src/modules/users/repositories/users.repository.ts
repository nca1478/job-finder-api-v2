import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepo.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.usersRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no fué encontrado`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.usersRepo.preload({
      ...updateUserDto,
      id,
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no fué encontrado`);
    }

    return this.usersRepo.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
