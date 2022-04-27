import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { from, map, Observable } from 'rxjs';
import { DetailsDto } from 'src/notification/dto/details.dto';

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
    this.logger.log('GatewayInit');
  }

  handleConnection(socket: Socket) {
    const id = socket.handshake.auth.id;

    if (!id) {
      return socket.disconnect(true);
    }

    this.logger.log(`Client connected: ${socket.id}`);
    this.usersMap.set(id, socket.id);
  }

  handleDisconnect(socket: Socket) {
    this.usersMap.delete(socket.id);
    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  handleNotification(id: number, payload: { type: string; details: DetailsDto }) {
    const room = this.usersMap.get(id);
    this.logger.log(`room: ${room}`, id, payload);
    if (!room) return;

    this.server.to(room).emit('notification', payload);
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() _: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map((item) => ({ event: 'events', data: item })));
  }
}
