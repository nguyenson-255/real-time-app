import { Module } from '@nestjs/common';
import { TodoGateway } from './todo.gateway';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Connection } from './entities/connection.entity';
import { ConnectionService } from './services/connection.service';
import { TaskService } from './services/task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Connection, Task]),
    UserModule,
    AuthModule
  ],
  providers: [TodoGateway, ConnectionService, TaskService],
})
export class TodoModule {}
