import { Module } from '@nestjs/common';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { EmailsService } from './services/emails/emails.service';
import { EnvConfigModule, EnvConfigService } from '../../common/env-config';

@Module({
  imports: [
    SendGridModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: async (configService: EnvConfigService) => {
        return {
          apikey: configService.getSendgridAccessKey(),
        };
      },
    }),
  ],
  providers: [EmailsService, EnvConfigService],
  exports: [EmailsService],
})
export class EmailsModule {}
