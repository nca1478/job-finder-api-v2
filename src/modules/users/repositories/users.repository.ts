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

    await this.usersRepo.save(newUser);

    delete newUser.password;

    return newUser;
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

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepo.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuario con email ${email} no fué encontrado`,
      );
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

  async remove(id: string): Promise<UserEntity> {
    const user = await this.usersRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no fué encontrado`);
    }

    return this.usersRepo.remove(user);
  }
}
