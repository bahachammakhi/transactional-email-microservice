import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MailjetService } from './mailjet.service';

@Module({
  providers: [MailjetService],
  imports: [ConfigModule],
  exports: [MailjetService],
})
export class MailjetModule {}
