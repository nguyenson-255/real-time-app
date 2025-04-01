import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { DtoHelperService } from '../services/dto-help.service';
import { UserI } from '../interfaces/user.interfaces';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseI } from '../interfaces/login-response.interfaces';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private dtoHelperService: DtoHelperService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserI> {
    const user: UserI  = this.dtoHelperService.createDtoToEntites(createUserDto);
    return this.userService.create(user);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseI> {
    const loginEntites = this.dtoHelperService.loginDtoToEntites(loginDto);
    const jwt: string =  await this.userService.login(loginEntites);


    return {
      accessToken: jwt,
      tokenType: 'JWT',
      expiresIn: '1d'
    }
  }

  @Get()
  @UseGuards(new JwtAuthGuard())
  async getProfile(@Req() req) {
    console.log(await this.userService.test(req.headers['authorization'].split(' ')[1]));
    return 'aasssk7ddk12'
  }
}
