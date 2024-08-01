import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { EnvConfigService } from '../../../common/env-config';
import { AuthService } from '../services/auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: EnvConfigService,
  ) {
    super({
      clientID: configService.getFacebookAppId(),
      clientSecret: configService.getFacebookAppSecretKey(),
      callbackURL: configService.getFacebookCallbackUrl(),
      scope: 'email',
      profileFields: ['emails', 'name', 'photos'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, photos } = profile;

    const user = await this.authService.validateUserFacebook({
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      photo: photos[0].value,
    });

    // const payload = {
    //   user,
    //   accessToken,
    // };

    done(null, user);
  }
}
