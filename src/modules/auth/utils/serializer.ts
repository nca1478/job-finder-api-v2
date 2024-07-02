import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { UserEntity } from '../../../modules/users/entities/user.entity';
import { UsersService } from '../../../modules/users/services/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  serializeUser(user: UserEntity, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.usersService.findOne(payload.id);

    return user ? done(null, user) : done(null, null);
  }
}
