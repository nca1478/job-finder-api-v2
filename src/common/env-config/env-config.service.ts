import { Injectable } from '@nestjs/common';
import { EnvConfig } from './env-config.interface';
import { ConfigService } from '@nestjs/config';

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
}
