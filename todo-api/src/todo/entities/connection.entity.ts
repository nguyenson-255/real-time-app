import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PriorityEnum } from "../enum/priority.enum";
import { StatusEnum } from "../enum/status.enum";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Connection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    socketId: string;

    @ManyToOne(() => User, (user) => {user.connections})
    @JoinColumn()
    connectUser: User;

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
