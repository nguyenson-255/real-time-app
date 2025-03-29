import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PriorityEnum } from "../enum/priority.enum";
import { StatusEnum } from "../enum/status.enum";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({
        default: ''
    })
    description: string;

    @Column({
        default: new Date().toISOString()
    })
    dueDate: Date;

    @Column({
        type: 'enum',
        enum: PriorityEnum,
        default: PriorityEnum.MEDIUM,
    })
    priority: PriorityEnum;

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.NOT_STARTED,
    })
    status: StatusEnum;

    // @Column()
    // createdBy: User;

    // @Column()
    // updatedBy: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // // Tôi cần task nào
    // @ManyToMany(() => Task, (task) => task.dependents)
    // @JoinTable({
    //     name: 'task_dependencies',
    //     joinColumn: {
    //         name: 'dependentTaskId',
    //         referencedColumnName: 'id',
    //     },
    //     inverseJoinColumn: {
    //         name: 'dependencyTaskId',
    //         referencedColumnName: 'id',
    //     },
    // })
    // dependencies: Task[];

    // // Task nào cần tôi
    // @ManyToMany(() => Task, (task) => task.dependencies, {cascade: true})
    // dependents: Task[];
}
