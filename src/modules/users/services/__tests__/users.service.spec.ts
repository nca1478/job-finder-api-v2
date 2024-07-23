import { randomUUID } from 'crypto';
import { UsersService } from '../users.service';

describe('UsersService unit tests', () => {
  let service: UsersService;
  let id: string;
  let createdAt: Date;
  let expectOutputUsers: any;
  let mockUserRepository: any;

  beforeEach(async () => {
    service = new UsersService();
    id = randomUUID();
    createdAt = new Date();

    expectOutputUsers = {
      id,
      name: 'Test',
      email: 'test@gmail.com',
      password: '123456Pass$$',
      createdAt,
    };

    mockUserRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
    };
  });

  it('should be defined ', () => {
    expect(service).toBeDefined();
  });
});
