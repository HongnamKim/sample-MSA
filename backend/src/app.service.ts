import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(
    @Inject('COMMUNICATION')
    private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS')
    private readonly analyticsClient: ClientProxy,
  ) {}

  createUser(dto: CreateUserDto) {
    this.users.push(dto);
    console.log('user created');

    // 다른 microservice 로 이벤트 보내기
    // EventHandler 는 응답값을 보내지 않음. 응답이 필요한 경우 MessageHandler 를 사용해야함.
    this.communicationClient.emit(
      'user_created', // EventHandler 의 route
      new CreateUserEvent(dto.email), // payload, 전송할 데이터
    );

    this.analyticsClient.emit('user_created', new CreateUserEvent(dto.email));
  }

  getAnalytics() {
    console.log('get analytics');

    // 다른 microservice 로 메세지 보내기
    // MessageHandler 는 응답값을 보냄.
    // send 또는 emit 의 return 은 observable
    // pipe 메소드로 timeout 등을 설정할 수 있음.
    // nestjs 에서는 observable 을 반환할 경우 resolve 되어 클라이언트에 응답을 보냄.
    return this.analyticsClient.send('get_analytics', {});
  }
}
