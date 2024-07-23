import { randomUUID } from 'crypto';
import { UsersService } from '../users.service';
import { CreateUserDto, UpdateUserDto } from '../../dto';
import { roleEnum } from '../../models/user.model';
import { PageDto, PageMetaDto } from '../../../../common/dtos';
import { Order } from '../../../../common/constants/index';

describe('UsersService unit tests', () => {
  let service: UsersService;
  let id: string;
  let createdAt: Date;
  let updatedAt: Date;
  let deletedAt: Date;
  let birthday: Date;
  let expectOutputUsers: any;
  let mockUserRepository: any;

  beforeEach(async () => {
    service = new UsersService();
    id = randomUUID();
    createdAt = new Date();
    updatedAt = new Date();
    birthday = new Date('1978-09-14');
    deletedAt = null;

    expectOutputUsers = [
      {
        id,
        name: 'Test',
        email: 'test@gmail.com',
        password: '123456Pass$$',
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
});
