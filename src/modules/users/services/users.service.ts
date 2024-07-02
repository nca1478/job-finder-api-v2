import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../../common/dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.usersRepository.create(createUserDto);

    await this.usersRepository.save(newUser);

    delete newUser.password;

    return newUser;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<UserEntity>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('u');

    queryBuilder
      .orderBy('u.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);

    // return this.usersRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no fué encontrado`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuario con email ${email} no fué encontrado`,
      );
    }

    return user;
  }

  async findOneWithPassword(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: [
        'id',
        'name',
        'email',
        'password',
        'role',
        'img',
        'google',
        'facebook',
        'cvUrl',
        'createdAt',
      ],
    });

    if (!user) {
      throw new NotFoundException(
        `Usuario con email ${email} no fué encontrado`,
      );
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.preload({
      ...updateUserDto,
      id,
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no fué encontrado`);
    }

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no fué encontrado`);
    }

    return this.usersRepository.remove(user);
  }
}
