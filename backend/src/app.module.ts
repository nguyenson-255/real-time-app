import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './auth/auth.middleware';
import { Connection } from './todo/entities/connection.entity';
import { Task } from './todo/entities/task.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'postgres_app',
        // host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: process.env.DATABASE_PASSWORD ?? 'ns',
        database: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        logging: true
      }),
    }),
    TodoModule, 
    UserModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude(
      {
        path: 'api/users',
        method: RequestMethod.POST
      },
      {      
        path: 'api/users/login',
        method: RequestMethod.POST
      },
  )
    ;
  }
}
