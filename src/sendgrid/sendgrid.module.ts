import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SendgridService } from './sendgrid.service';

@Module({
  providers: [SendgridService],
  imports: [ConfigModule],
  exports: [SendgridService],
})
export class SendgridModule {}
