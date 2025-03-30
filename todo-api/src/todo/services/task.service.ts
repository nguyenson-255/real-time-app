import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TaskI } from 'src/todo/interfaces/task.interface';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { StatusEnum } from '../enum/status.enum';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        private readonly taskReponsitory: Repository<Task>
    ) {}

    async create(task: CreateTaskDto): Promise<TaskI> {
        return await this.taskReponsitory.save(task);
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskI> {
        const task = await this.taskReponsitory.findOne({ where: { id } });
        
        if (!task) {
            throw new NotFoundException('Task not found');
        }

        if (!!updateTaskDto.status) {
            task.status = updateTaskDto.status;
        }

        Object.assign(task, {
            title: updateTaskDto.title ?? task.title,
            description: updateTaskDto.description ?? task.description,
            priority: updateTaskDto.priority ?? task.priority,
            dueDate: updateTaskDto.dueDate ?? task.dueDate
          });
      
        return await this.taskReponsitory.save(task);
    }

    async findAll(): Promise<TaskI[]> {
        return await this.taskReponsitory.find() 
    }

    async saveAll(tasks: TaskI[]): Promise<TaskI[]> {
        return await this.taskReponsitory.save(tasks);
    }
}
