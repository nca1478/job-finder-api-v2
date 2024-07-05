import { Injectable } from '@nestjs/common';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { EnvConfigService } from '../../../../common/env-config';
import { changePasswordEmail } from '../../templates';

@Injectable()
export class EmailsService {
  constructor(
    private readonly configService: EnvConfigService,
    private readonly sendgridService: SendGridService,
  ) {}

  async changePassEmail(email: string, token: string): Promise<any> {
    const subject = 'Solicitud de cambio de contraseña';
    const urlClient = this.configService.getUrlClient();
    const urlRedirect = `${urlClient}/change-password?token=${token}`;
    const templateHTML = changePasswordEmail(urlRedirect);

    return await this.sendEmail({ email, subject, templateHTML });
  }

  private async sendEmail(emailInfo: any): Promise<any> {
    const { email, subject, templateHTML } = emailInfo;

    const msg: any = {
      to: email,
      from: `Jobfinder App <${this.configService.getSendgridFromEmail()}>`,
      subject,
      text: 'Jobfinder App',
      html: templateHTML,
      mailSettings: {
        sandboxMode: { enable: this.configService.getSendgridSandboxMode() },
      },
    };

    return await this.sendgridService.send(msg);
  }
}
