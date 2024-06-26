import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfigModule, EnvConfigService } from '../../common/env-config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      useFactory: async (configService: EnvConfigService) => {
        return {
          secret: configService.getJwtSecret(),
          signOptions: {
            expiresIn: configService.getJwtExpiration(),
            algorithm: configService.getJwtAlgorithm(),
          },
        };
      },
      inject: [EnvConfigService],
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
