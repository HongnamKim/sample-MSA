import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateUserEvent } from './create-user.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user_created')
  handleUserCreated(@Payload() event: CreateUserEvent) {
    this.appService.handleUserCreated(event);
  }
}
