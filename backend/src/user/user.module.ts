import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DtoHelperService } from './services/dto-help.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, DtoHelperService],
})
export class UserModule {}
