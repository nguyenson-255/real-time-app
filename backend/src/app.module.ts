import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        // host: 'postgres_app',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: process.env.DATABASE_PASSWORD ?? 'ns',
        database: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TodoModule, 
    UserModule],
})
export class AppModule {}
