import { join } from 'path';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { DatabaseModule } from './common/database/database.module';
import { EnvConfigModule } from './common/env-config/env-config.module';

import { AuthModule } from './modules/auth/auth.module';
import { EmailsModule } from './modules/emails/emails.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from './common/modules/cloudinary/cloudinary.module';

import { UserEntity } from './modules/users/entities/user.entity';
import { SkillEntity } from './modules/skills/entities/skill.entity';

import { ValidateUserMiddleware } from './common/middlewares';
import { SkillsModule } from './modules/skills/skills.module';
import { SectorsModule } from './modules/sectors/sectors.module';

@Module({
  imports: [
    AuthModule,

    CloudinaryModule,

    DatabaseModule,

    EmailsModule,

    EnvConfigModule.forRoot({
      isGlobal: true,
    }),

    UsersModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),

    SectorsModule,

    SkillsModule,

    TypeOrmModule.forFeature([UserEntity, SkillEntity]),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUserMiddleware).forRoutes({
      path: '/users/:id/upload-file',
      method: RequestMethod.POST,
    });
  }
}
