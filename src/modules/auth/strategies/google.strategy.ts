import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID:
        '699491018053-u4vs2sliupdgfvqgrau347hlhprsh2bu.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/api/v2/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validateUserGoogle({
      email: profile.emails[0].value,
      displayName: profile.displayName,
    });

    return user || null;
  }
}
