import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { EnvConfigModule, EnvConfigService } from '../../common/env-config';
import { UserEntity } from '../users/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    EnvConfigModule,
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
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthService, JwtStrategy, JwtModule],
  exports: [AuthService],
})
export class AuthModule {}
