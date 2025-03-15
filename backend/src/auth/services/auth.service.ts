import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserI } from 'src/user/interfaces/user.interfaces';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async generateToken(user: UserI): Promise<string> {
        return this.jwtService.signAsync(user)
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hashSync(password, 10);
    }

    async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return bcrypt.compareSync(password,hashPassword);
    }

    async vertifyJwt(jwt: string): Promise<any> {
        return this.jwtService.verifyAsync(jwt);
    }
 }
