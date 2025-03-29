import { UserI } from "src/user/interfaces/user.interfaces";
import { PriorityEnum } from "../enum/priority.enum";
import { StatusEnum } from "../enum/status.enum";

export interface TaskI {

    id: number;

    title: string;

    description: string;

    dueDate: Date;

    priority: PriorityEnum;

    status: StatusEnum;

    createdBy?: UserI;

    updatedBy?: UserI;

    createdAt?: Date;

    updatedAt?: Date;
}

export interface ConnectionI {
    id?: number;

    socketId?: string;

    connectUser?: UserI;
}