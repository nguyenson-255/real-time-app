import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { StatusEnum } from '../enum/status.enum';
import { IsEnum, IsNotEmpty, IsNumber, isNumber, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsOptional()
    @IsEnum(StatusEnum, { message: 'Status must be In Progress, or Completed' })
    status?: StatusEnum;
}
