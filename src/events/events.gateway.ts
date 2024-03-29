import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { NotificationTypeDto } from 'src/notification/dto/notification.type.dto';
import { DetailsDto } from 'src/notification/dto/details.dto';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  cookie: true,
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;
  private usersMap = new Map();
  private logger: Logger = new Logger('AppGateway');

  constructor(private userService: UserService) {}

  afterInit() {
    this.logger.log('EventsGateway init');
  }

  handleConnection(socket: Socket) {
    const { id, device } = socket.handshake.auth;

    if (!id) {
      return socket.disconnect(true);
    }

    this.usersMap.set(id, socket.id);
    this.userService.getRepository().update({ id }, { online: true, lastSeen: null, device });
  }

  handleDisconnect(socket: Socket) {
    const [id] = [...this.usersMap.entries()].find(([, socketId]) => socketId === socket.id) || [];

    if (!id) return;

    this.usersMap.delete(socket.id);
    this.userService.getRepository().update({ id }, { online: false, lastSeen: new Date().toISOString() });
  }

  handleNotification(id: number, payload: { type: NotificationTypeDto; details: DetailsDto }) {
    const socketId = this.usersMap.get(id);

    if (!socketId) return;

    this.server.to(socketId).emit('notification', payload);
  }
}
