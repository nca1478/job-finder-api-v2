import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../users.service';
import { UserEntity } from '../../entities/user.entity';

import { PageDto, PageMetaDto } from '../../../../common/dtos';
import { CreateUserDto, UpdateUserDto } from '../../dto';

import { Order } from '../../../../common/constants/index';
import { roleEnum } from '../../models/user.model';

describe('UsersService unit tests', () => {
  let service: UsersService;
  let id: string;
  let email: string;
  let password: string;
  let token: string;
  let createdAt: Date;
  let updatedAt: Date;
  let deletedAt: Date;
  let birthday: Date;
  let expectOutputUsers: any;
  let mockUserRepository: any;

  beforeEach(async () => {
    service = new UsersService();
    id = randomUUID();
    email = 'test@gmail.com';
    password = 'myPassword';
    token = 'ABC123';
    createdAt = new Date();
    updatedAt = new Date();
    birthday = new Date('1978-09-14');
    deletedAt = null;

    expectOutputUsers = [
      {
        id,
        name: 'Test',
        email: 'test@gmail.com',
        role: roleEnum.user,
        img: null,
        google: false,
        facebook: false,
        tokenRecovery: null,
        birthday,
        profession: 'Test',
        education: 'Test',
        cvUrl: null,
        linkedinUser: null,
        twitterUser: null,
        instagramUser: null,
        facebookUser: null,
        createdAt,
        updatedAt,
        deletedAt,
        active: true,
      },
    ];

    mockUserRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      createQueryBuilder: jest.fn().mockReturnValue({
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(expectOutputUsers.length),
        getRawAndEntities: jest
          .fn()
          .mockResolvedValue({ entities: expectOutputUsers, raw: [] }),
      }),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
    };
  });

  it('should be defined ', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    //@ts-expect-error defined part of methods
    service['usersRepository'] = mockUserRepository;

    const createUserDto: CreateUserDto = {
      name: 'Test',
      email: 'test1@gmail.com',
      password: '123456Pass$$',
    };

    const newUser = await service.create(createUserDto);

    expect(mockUserRepository.create).toHaveBeenCalled();
    expect(mockUserRepository.save).toHaveBeenCalled();

    expect(expectOutputUsers).toStrictEqual(newUser);
  });

  it('should list all users', async () => {
    //@ts-expect-error defined part of methods
    service['usersRepository'] = mockUserRepository;

    const itemCount: number = 1;
    const pageOptionsDto: any = {
      order: Order.ASC,
      page: 1,
      take: 10,
    };

    const users = await service.findAll(pageOptionsDto);

    expect(mockUserRepository.createQueryBuilder).toHaveBeenCalled();

    expect(users).toBeInstanceOf(PageDto);
    expect(users.data).toHaveLength(itemCount);
    expect(users.meta).toBeInstanceOf(PageMetaDto);
    expect(users.meta.itemCount).toBe(itemCount);
    expect(expectOutputUsers).toStrictEqual(users.data);
  });

  it('should gets a user by id', async () => {
    //@ts-expect-error defined part of methods
    service['usersRepository'] = mockUserRepository;

    const user = await service.findOne(id);

    expect(mockUserRepository.findOne).toHaveBeenCalled();
    expect(expectOutputUsers).toStrictEqual(user);
  });

  it('should not gets a user by id (throw NotFoundException)', async () => {
    //@ts-expect-error defined part of methods
    service['usersRepository'] = {
      ...mockUserRepository,
      findOne: jest.fn().mockReturnValue(Promise.resolve(null)),
    };

    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
  });

  it('should gets a user by email', async () => {
    //@ts-expect-error defined part of methods
    service['usersRepository'] = mockUserRepository;

    const user = await service.findOneByEmail(email);

    expect(mockUserRepository.findOne).toHaveBeenCalled();
    expect(expectOutputUsers).toStrictEqual(user);
  });

  it('should not gets a user by email (throw NotFoundException)', async () => {
    //@ts-expect-error defined part of methods
    service['usersRepository'] = {
      ...mockUserRepository,
      findOne: jest.fn().mockReturnValue(Promise.resolve(null)),
    };

    await expect(service.findOneByEmail(email)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should gets a user by email/token', async () => {
    //@ts-expect-error defined part of methods
    service['usersRepository'] = mockUserRepository;

    const user = await service.findOneByEmailAndToken(email, token);

    expect(mockUserRepository.findOne).toHaveBeenCalled();
    expect(expectOutputUsers).toStrictEqual(user);
  });

  it('should not gets a user by email/token (throw NotFoundException)', async () => {
    //@ts-expect-error defined part of methods
    service['usersRepository'] = {
      ...mockUserRepository,
      findOne: jest.fn().mockReturnValue(Promise.resolve(null)),
    };

    await expect(service.findOneByEmailAndToken(email, token)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should gets a user with password by email', async () => {
    //@ts-expect-error defined part of methods
    service['usersRepository'] = {
      ...mockUserRepository,
      findOne: jest.fn().mockResolvedValue([
        {
          ...expectOutputUsers[0],
          password,
        },
      ]),
    };

    expectOutputUsers = expectOutputUsers.map((user) => ({
      ...user,
      password,
    }));

    const user = await service.findOneWithPassword(email);

    expect(expectOutputUsers).toEqual(user);
    expect(user[0].password).toBe('myPassword');
  });

  it('should not gets a user with password by email (throw NotFoundException)', async () => {
    //@ts-expect-error defined part of methods
    service['usersRepository'] = {
      ...mockUserRepository,
      findOne: jest.fn().mockReturnValue(Promise.resolve(null)),
    };

    await expect(service.findOneWithPassword(email)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update a user', async () => {
    //@ts-expect-error defined part of methods
    service['usersRepository'] = mockUserRepository;

    const updateUserDto: UpdateUserDto = {
      name: 'Test',
      email: 'test@gmail.com',
      profession: 'Test',
      birthday: new Date('1978-09-14'),
      education: 'Test',
      cvUrl: null,
      linkedinUser: 'test',
      twitterUser: 'test',
      instagramUser: 'test',
      facebookUser: 'test',
    };

    const user = await service.update(id, updateUserDto);

    expect(mockUserRepository.preload).toHaveBeenCalled();
    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(expectOutputUsers).toStrictEqual(user);
  });

  it('should not update a user (throw NotFoundException)', async () => {
    //@ts-expect-error defined part of methods
    service['usersRepository'] = {
      ...mockUserRepository,
      preload: jest.fn().mockReturnValue(Promise.resolve(null)),
    };

    await expect(service.update(id, null)).rejects.toThrow(NotFoundException);
  });

  it('should remove a user', async () => {
    //@ts-expect-error defined part of methods
    service['usersRepository'] = mockUserRepository;

    const user = await service.remove(id);

    expect(mockUserRepository.findOne).toHaveBeenCalled();
    expect(mockUserRepository.remove).toHaveBeenCalled();
    expect(expectOutputUsers).toStrictEqual(user);
  });

  it('should not remove a user (throw NotFoundException)', async () => {
    //@ts-expect-error defined part of methods
    service['usersRepository'] = {
      ...mockUserRepository,
      findOne: jest.fn().mockReturnValue(Promise.resolve(null)),
    };

    await expect(service.remove(id)).rejects.toThrow(NotFoundException);
  });

  it('should verify user (good credentials)', async () => {
    const verifyUserDto = { email: 'test@gmail.com', password: 'myPassword' };
    const user = new UserEntity();

    user.email = 'test@gmail.com';
    user.password = bcrypt.hashSync('myPassword', 10);

    jest.spyOn(service, 'findOneWithPassword').mockResolvedValue(user);

    const result = await service.verify(verifyUserDto);

    expect(result).toEqual({ ...user, password: undefined });
  });

  it('should not verify user (bad credential)', async () => {
    const verifyUserDto = { email: 'test@example.com', password: 'wrongPass' };
    const user = new UserEntity();

    user.email = 'test@example.com';
    user.password = bcrypt.hashSync('password', 10);

    jest.spyOn(service, 'findOneWithPassword').mockResolvedValue(user);

    await expect(service.verify(verifyUserDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should should not verify user (user not found)', async () => {
    const verifyUserDto = {
      email: 'test9@example.com',
      password: 'myPassword',
    };

    jest.spyOn(service, 'findOneWithPassword').mockResolvedValue(null);

    await expect(service.verify(verifyUserDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
