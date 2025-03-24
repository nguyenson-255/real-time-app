import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TaskI } from 'src/todo/interfaces/task.interface';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        private readonly taskReponsitory: Repository<Task>
    ) {}

    async findAll(): Promise<TaskI[]> {
        return await this.taskReponsitory.find() 
    }

    async saveAll(tasks: TaskI[]): Promise<TaskI[]> {
        return await this.taskReponsitory.save(tasks);
    }
}
