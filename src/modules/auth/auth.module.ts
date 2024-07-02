import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { EnvConfigModule, EnvConfigService } from '../../common/env-config';
import { FacebookStrategy, GoogleStrategy, JwtStrategy } from './strategies';
import { UsersService } from '../users/services/users.service';
import { AuthController } from './controllers/auth.controller';
import { UserEntity } from '../users/entities/user.entity';
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
    FacebookStrategy,
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
