import { randomUUID } from 'crypto';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../../dto';
import { roleEnum } from '../../models/user.model';

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
});
