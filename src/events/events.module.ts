import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway],
  imports: [UserModule],
  exports: [EventsGateway],
})
export class EventsModule {}
