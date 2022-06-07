import { SendgridModule } from './../sendgrid/sendgrid.module';
import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerGateway } from './mailer.processor';
import { MailjetModule } from 'src/mailjet/mailjet.module';
// import { SendgridService } from 'src/sendgrid/sendgrid.service';
// import { MailjetService } from 'src/mailjet/mailjet.service';

@Module({
  providers: [MailerGateway, MailerService],
  imports: [SendgridModule, MailjetModule],
})
export class MailerModule {}
