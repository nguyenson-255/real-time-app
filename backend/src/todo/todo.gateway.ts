import { UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { UserI } from 'src/user/interfaces/user.interfaces';
import { UserService } from 'src/user/services/user.service';
import { ConnectionService } from './services/connection.service';
import { TaskService } from './services/task.service';

@WebSocketGateway({namespace: 'todos'})
export class TodoGateway implements OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer()
  server: Server;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private connectService: ConnectionService,
    private taskService: TaskService
  ) {}

  async handleDisconnect(socket: Socket) {

    await this.connectService.deleteSocketId(socket.id);
    socket.disconnect();
  }

  async handleConnection(socket: Socket) {
    try {            
      const decodeToken = await this.authService.vertifyJwt(socket.handshake.auth.authorization);

      const user: UserI = await this.userService.findOneById(decodeToken.id);
      
      if (!user) {        
        return this.disconnect(socket);
      } else {
        await this.connectService.create({socketId: socket.id, connectUser: user})
        
        const tasks = await this.taskService.findAll();

        return this.server.to(socket.id).emit('tasks',tasks);
      }
    } catch (error) {
      return this.disconnect(socket);
    }
  }

  private disconnect(socket: Socket) {    
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    console.log(`receiver: ${payload}`);
    client.emit('data');
  }
}
