import { Module } from '@nestjs/common';
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

    UsersModule,
  ],
})
export class AppModule {}
