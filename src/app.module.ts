import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { DatabaseModule } from './common/database/database.module';
import { EnvConfigModule } from './common/env-config/env-config.module';

import { AuthModule } from './modules/auth/auth.module';
import { EmailsModule } from './modules/emails/emails.module';
import { UsersModule } from './modules/users/users.module';
import { CloudinaryModule } from './common/modules/cloudinary/cloudinary.module';

import { SkillsModule } from './modules/skills/skills.module';
import { SectorsModule } from './modules/sectors/sectors.module';
import { OffersModule } from './modules/offers/offers.module';

@Module({
  imports: [
    AuthModule,

    CloudinaryModule,

    DatabaseModule,

    EmailsModule,

    EnvConfigModule.forRoot({
      isGlobal: true,
    }),

    OffersModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),

    SectorsModule,

    SkillsModule,

    UsersModule,
  ],
})
export class AppModule {}
