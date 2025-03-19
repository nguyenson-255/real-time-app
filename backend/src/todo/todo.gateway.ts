import { UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { UserI } from 'src/user/interfaces/user.interfaces';
import { UserService } from 'src/user/services/user.service';

@WebSocketGateway({namespace: 'todos'})
export class TodoGateway implements OnGatewayConnection{
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  async handleConnection(socket: Socket) {

    try {
      const decodeToken = await this.authService.vertifyJwt(socket.handshake.headers.authorization);

      const user: UserI = await this.userService.findOneById(decodeToken.id);

      if (!user) {
        return this.disconnect(socket);
      } else {
        console.log('do smt', user);
        
      }
    } catch (error) {
      return this.disconnect(socket);
    }
  }


  private disconnect(socket: Socket) {
    console.log('disconnect user');
    
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
