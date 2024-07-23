import { UsersService } from '../users.service';

describe('UsersService unit tests', () => {
  let service: UsersService;

  beforeEach(async () => {
    service = new UsersService();
  });

  it('should be defined ', () => {
    expect(service).toBeDefined();
  });
});
