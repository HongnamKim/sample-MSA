import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  handleUserCreated(event: CreateUserEvent) {
    console.log('User Created - COMMUNICATION', event);
  }
}
