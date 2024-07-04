import { Algorithm } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './env-config.interface';

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private configService: ConfigService) {}

  getAppPort(): number {
    return Number(this.configService.getOrThrow<number>('PORT'));
  }

  getNodeEnv(): string {
    return this.configService.getOrThrow<string>('NODE_ENV');
  }

  getDbHost(): string {
    return this.configService.getOrThrow<string>('DB_HOST');
  }

  getDbPort(): number {
    return Number(this.configService.getOrThrow<number>('DB_PORT'));
  }

  getDbUsername(): string {
    return this.configService.getOrThrow<string>('DB_USERNAME');
  }

  getDbPassword(): string {
    return this.configService.getOrThrow<string>('DB_PASSWORD');
  }

  getDbName(): string {
    return this.configService.getOrThrow<string>('DB_NAME');
  }

  getJwtSecret(): string {
    return this.configService.getOrThrow<string>('JWT_SECRET');
  }

  getJwtExpiration(): string {
    return this.configService.getOrThrow<string>('JWT_EXPIRATION');
  }

  getJwtAlgorithm(): Algorithm {
    return this.configService.getOrThrow<Algorithm>('JWT_ALGORITHM');
  }

  getGoogleClientId(): string {
    return this.configService.getOrThrow<string>('GOOGLE_CLIENT_ID');
  }

  getGoogleClientSecret(): string {
    return this.configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET');
  }

  getGoogleCallbackUrl(): string {
    return this.configService.getOrThrow<string>('GOOGLE_CALLBACK_URL');
  }

  getApiSessionKey(): string {
    return this.configService.getOrThrow<string>('SESSION_KEY');
  }

  getFacebookAppId(): string {
    return this.configService.getOrThrow<string>('FACEBOOK_APP_ID');
  }

  getFacebookAppSecretKey(): string {
    return this.configService.getOrThrow<string>('FACEBOOK_APP_SECRET_KEY');
  }

  getFacebookCallbackUrl(): string {
    return this.configService.getOrThrow<string>('FACEBOOK_CALLBACK_URL');
  }

  getSendgridAccessKey(): string {
    return this.configService.getOrThrow<string>('SENDGRID_ACCESS_KEY');
  }

  getSendgridFromEmail(): string {
    return this.configService.getOrThrow<string>('SENDGRID_FROM_EMAIL');
  }
}
