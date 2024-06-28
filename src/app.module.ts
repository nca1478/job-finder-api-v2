import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DatabaseModule } from './common/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { EnvConfigModule } from './common/env-config/env-config.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,

    DatabaseModule,

    EnvConfigModule.forRoot({
      isGlobal: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    UsersModule,
  ],
})
export class AppModule {}
