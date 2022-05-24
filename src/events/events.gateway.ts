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

  async handleConnection(socket: Socket) {
    const { id, mobile } = socket.handshake.auth;
    const device = mobile ? 'mobile' : 'desktop';

    if (!id) {
      return socket.disconnect(true);
    }

    await this.userService.getRepository().update({ id }, { status: 'online', device });
    this.usersMap.set(id, socket.id);
  }

  async handleDisconnect(socket: Socket) {
    const [id] = [...this.usersMap.entries()].find(([, userId]) => userId === socket.id) || [];

    if (!id) return;

    await this.userService.getRepository().update({ id }, { status: new Date().toISOString });
    this.usersMap.delete(socket.id);
  }

  handleNotification(id: number, payload: { type: NOTIFICATION; details: DetailsDto }) {
    const socketId = this.usersMap.get(id);

    if (!socketId) return;

    this.server.to(socketId).emit('notification', payload);
  }
}
