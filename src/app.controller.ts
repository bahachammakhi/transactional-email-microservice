import { InjectQueue } from '@nestjs/bull';
import { Controller, Get } from '@nestjs/common';
import { Queue } from 'bull';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectQueue('mailer') private mailerQueue: Queue,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    const job = await this.mailerQueue.add({
      to: 'bahachammakhi25@gmail.com',
      from: 'bahachammakhi25@gmail.com',
      text: 'Some random email',
      html: '<h1>Hello</h1>',
    });
    return job;
  }
}
