import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigService } from '../env-config/env-config.service';
import { EnvConfigModule } from '../env-config/env-config.module';
import { UserEntity } from '../../modules/users/entities/user.entity';

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
          synchronize: true,
        };
      },
      inject: [EnvConfigService],
    }),
  ],
})
export class DatabaseModule {}
