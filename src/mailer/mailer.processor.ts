import { Processor, Process, OnQueueError } from '@nestjs/bull';
import { Job } from 'bull';
import * as SendGrid from '@sendgrid/mail';
import { MailerService } from './mailer.service';

@Processor('mailer')
export class MailerGateway {
  constructor(private readonly mailerService: MailerService) {}

  @Process()
  async transcode(job: Job<SendGrid.MailDataRequired>) {
    await this.mailerService.sendEmail(job.data);
    return {
      sent: true,
    };
  }
  @OnQueueError()
  async OnQueueError(jobId: string) {
    console.log('(Global) on Error: job ', jobId);
  }
}
