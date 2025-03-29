import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserService } from 'src/user/services/user.service';
import { UserI } from 'src/user/interfaces/user.interfaces';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  async use(req: any, res: any, next: () => void) {
    try {
      console.log('1111111');
      
      const tokenArray: string[] = req.headers['authorization'].spilit(' ')

      const decodeToken = await this.authService.vertifyJwt(tokenArray[1]);
      
      const user: UserI = await this.userService.findOneById(decodeToken.id);

      if (user) {
        req.user = user;
        next();
      } else {
        throw new UnauthorizedException();
      }
      
    } catch {
      throw new UnauthorizedException();
    }
  }
}
