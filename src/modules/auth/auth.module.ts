import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { EnvConfigModule, EnvConfigService } from '../../common/env-config';
import { FacebookStrategy, GoogleStrategy, JwtStrategy } from './strategies';
import { AuthController } from './controllers/auth.controller';
import { UserEntity } from '../users/entities/user.entity';
import { SessionSerializer } from './utils/Serializer';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    EnvConfigModule,
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: async (configService: EnvConfigService) => {
        return {
          secret: configService.getJwtSecret(),
          signOptions: {
            expiresIn: configService.getJwtExpiration(),
            algorithm: configService.getJwtAlgorithm(),
          },
        };
      },
    }),
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => UsersModule),
  ],
  providers: [
    AuthService,
    FacebookStrategy,
    GoogleStrategy,
    JwtStrategy,
    JwtModule,
    SessionSerializer,
  ],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
