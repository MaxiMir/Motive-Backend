import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { DetailsDto } from 'src/notification/dto/details.dto';
import { NOTIFICATION } from 'src/common/notification';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  cookie: true,
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  usersMap = new Map();

  private logger: Logger = new Logger('AppGateway');

  afterInit() {
    this.logger.log('EventsGateway init');
  }

  handleConnection(socket: Socket) {
    const id = socket.handshake.auth.id;

    if (!id) {
      return socket.disconnect(true);
    }

    this.usersMap.set(id, socket.id);
  }

  handleDisconnect(socket: Socket) {
    this.usersMap.delete(socket.id);
  }

  handleNotification(id: number, payload: { type: NOTIFICATION; details: DetailsDto }) {
    const room = this.usersMap.get(id);

    if (!room) return;

    this.server.to(room).emit('notification', payload);
  }
}
