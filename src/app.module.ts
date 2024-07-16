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
import { SectorEntity } from './modules/sectors/entities/sector.entity';

import { ValidateUserMiddleware } from './common/middlewares';
import { SkillsModule } from './modules/skills/skills.module';
import { SectorsModule } from './modules/sectors/sectors.module';
import { OffersModule } from './modules/offers/offers.module';
import { OfferEntity } from './modules/offers/entities/offer.entity';

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

    TypeOrmModule.forFeature([
      UserEntity,
      SkillEntity,
      SectorEntity,
      OfferEntity,
    ]),

    UsersModule,
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
