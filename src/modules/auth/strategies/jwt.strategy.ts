import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { EnvConfigService } from '../../../common/env-config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserEntity } from '../../../modules/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: EnvConfigService,
  ) {
    super({
      jwtFromRequest: authService.returnJwtExtractor(),
      secretOrKey: configService.getJwtSecret(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.authService.validateUser(payload);

    if (!user) throw new UnauthorizedException('Token no válido');

    return user;
  }
}
