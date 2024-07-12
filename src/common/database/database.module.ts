import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigModule, EnvConfigService } from '../env-config';

import { UserEntity } from '../../modules/users/entities/user.entity';
import { SkillEntity } from '../../modules/skills/entities/skill.entity';

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
          entities: [UserEntity, SkillEntity],
          synchronize: false,
        };
      },
      inject: [EnvConfigService],
    }),
  ],
})
export class DatabaseModule {}
