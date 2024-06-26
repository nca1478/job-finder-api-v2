import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { EnvConfigModule, EnvConfigService } from '../env-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      useFactory: async (configService: EnvConfigService) => {
        return {
          type: 'postgres',
          host: configService.getDbHost(),
          port: configService.getDbPort(),
          username: configService.getDbUsername(),
          password: configService.getDbPassword(),
          database: configService.getDbName(),
          entities: [UserEntity],
          synchronize: false,
        };
      },
      inject: [EnvConfigService],
    }),
  ],
})
export class DatabaseModule {}
