import { SendgridService } from './../sendgrid/sendgrid.service';
import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';
import { MailjetService } from 'src/mailjet/mailjet.service';

@Injectable()
export class MailerService {
  private clients: (SendgridService | MailjetService)[];
  private currentClient = 0;
  constructor(sendgridService: SendgridService, mailJetSerice: MailjetService) {
    this.clients = [sendgridService, mailJetSerice];
  }

  async sendEmail(email: SendGrid.MailDataRequired) {
    try {
      const client = this.clients[this.currentClient];
      client.send(email);
    } catch (err) {
      if (this.clients.length < this.currentClient) {
        throw new Error('Problem while sending email !');
      }
      this.sendEmail(email);
    }
  }
}
