import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    this.appService.createUser(dto);
  }

  @Get('analytics')
  getAnalytics() {
    return this.appService.getAnalytics();
  }
}
