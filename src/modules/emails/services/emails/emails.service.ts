import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EnvConfigService } from '../../../../common/env-config';

@Injectable()
export class EmailsService {
  constructor(
    private readonly configService: EnvConfigService,
    private readonly sendgridService: SendGridService,
  ) {}

  async forgotPassEmail(email: string, token: string): Promise<any> {
    try {
      const subject = 'Solicitud recibida exitosamente';
      const urlClient = this.configService.getUrlClient();
      const urlRedirect = `${urlClient}/change-password?token=${token}`;
      const templateHTML = `
		    <h1>Instrucciones para restablecer la contraseña</h1>
        <p>
            Recibimos una solicitud para restablecer la contraseña. Este enlace es válido durante las próximas 24 horas: &nbsp;
            <a href="${urlRedirect}">Recuperar contraseña</a>
        </p>
	    `;

      return await this.sendEmail({ email, subject, templateHTML });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  private async sendEmail(emailInfo: any) {
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
