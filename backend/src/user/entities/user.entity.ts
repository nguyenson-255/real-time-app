import { Connection } from "src/todo/entities/connection.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column({select: false})
    password: string;

    @ManyToOne(() => Connection, (connection) => {connection.connectUser})
    connections: Connection[];

    @BeforeInsert()
    @BeforeUpdate()
    emailAndUsernameToLowcase() {
        this.email = this.email.toLowerCase();
        this.username = this.username.toLowerCase();
    }
}
