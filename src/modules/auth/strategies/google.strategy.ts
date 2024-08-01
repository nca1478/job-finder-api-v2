import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../services/auth.service';
import { EnvConfigService } from 'src/common/env-config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: EnvConfigService,
  ) {
    super({
      clientID: configService.getGoogleClientId(),
      clientSecret: configService.getGoogleClientSecret(),
      callbackURL: configService.getGoogleCallbackUrl(),
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validateUserGoogle({
      email: profile.emails[0].value,
      displayName: profile.displayName,
      photo: profile.photos[0].value,
    });

    return user || null;
  }
}
