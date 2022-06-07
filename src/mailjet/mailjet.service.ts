import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as MailJet from 'node-mailjet';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class MailjetService {
  private client: MailJet.Email.PostResource;
  constructor(private readonly configService: ConfigService) {
    this.client = MailJet.connect(
      this.configService.get<string>('MJ_APIKEY_PUBLIC'),
      this.configService.get<string>('MJ_APIKEY_PRIVATE'),
    ).post('send', { version: 'v3.1' });
  }

  async send(mail: SendGrid.MailDataRequired) {
    const payload: MailJet.Email.SendParams = {
      Messages: [
        {
          From: {
            Email: mail.from.toString(),
          },

          To: [{ Email: mail.to.toString() }],
          Subject: mail.subject,
          TextPart: mail.text,
          HTMLPart: mail.html,
        },
      ],
    };
    const result = await this.client.request(payload);

    return result;
  }
}
