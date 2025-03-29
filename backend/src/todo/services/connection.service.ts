import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'src/todo/entities/connection.entity';
import { ConnectionI } from 'src/todo/interfaces/task.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectionService {
    constructor(
        @InjectRepository(Connection)
        private readonly connectionReponsitory: Repository<Connection>
    ) {}

    async create(connection: ConnectionI): Promise<ConnectionI> {
        return await this.connectionReponsitory.save(this.connectionReponsitory.create(connection));
    }

    async findByUserId(userId: string): Promise<ConnectionI[]> {
        return await this.connectionReponsitory.find({
            where: {connectUser: {id: userId}}
        });
    }

    async deleteSocketId(sockerId: string) {
        await this.connectionReponsitory.delete({socketId: sockerId});
    }

    async deleteSocketAll() {
        await this.connectionReponsitory.createQueryBuilder().delete().execute();
    }

    async findAll(): Promise<ConnectionI[]> {
        return await this.connectionReponsitory.find();
    }
}

