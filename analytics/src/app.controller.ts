import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateUserEvent } from './create-user.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // EventHandler --> 응답값 없음.
  @EventPattern('user_created')
  handleUserCreated(data: CreateUserEvent) {
    this.appService.handleUserCreated(data);
  }

  @MessagePattern('get_analytics')
  getAnalytics() {
    return this.appService.getAnalytics();
  }
}
