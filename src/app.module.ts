import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from './mailer/mailer.module';
import { SendgridModule } from './sendgrid/sendgrid.module';
import { MailjetModule } from './mailjet/mailjet.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule,
    SendgridModule,
    MailjetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
