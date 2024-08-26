import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigModule, EnvConfigService } from '../env-config';

const DB_ENTITIES = __dirname + '/../../modules/**/entities/*.entity{.ts,.js}';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      useFactory: async (configService: EnvConfigService) => {
        const isSSLEnabled = configService.getDbSslEnabled() === 'true';
        const isRejectUnauthorized =
          configService.getDbSslRejectUnauthorized() === 'true';

        return {
          type: 'postgres',
          host: configService.getDbHost(),
          port: Number(configService.getDbPort()),
          username: configService.getDbUsername(),
          password: configService.getDbPassword(),
          database: configService.getDbName(),
          entities: [DB_ENTITIES],
          ssl: isSSLEnabled
            ? { rejectUnauthorized: isRejectUnauthorized }
            : false,
          synchronize: configService.getDbSynchronize() === 'true',
        };
      },
      inject: [EnvConfigService],
    }),
  ],
})
export class DatabaseModule {}
