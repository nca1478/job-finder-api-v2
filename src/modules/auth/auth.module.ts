import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { EnvConfigModule, EnvConfigService } from '../../common/env-config';
import { UserEntity } from '../users/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { SessionSerializer } from './utils/Serializer';

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
  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    JwtModule,
    SessionSerializer,
    UsersService,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
