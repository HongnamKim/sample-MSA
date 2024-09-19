import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMUNICATION',
        transport: Transport.TCP,
        options: {
          port: 3100, // 마이크로서비스의 포트 번호
        },
      },
      {
        name: 'ANALYTICS',
        transport: Transport.TCP,
        options: {
          port: 3101,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
