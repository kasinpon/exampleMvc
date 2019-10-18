import {
    Entity,
        PrimaryGeneratedColumn,
        Column,
        CreateDateColumn,
        UpdateDateColumn,
        OneToOne,
        JoinColumn,
        OneToMany
} from "typeorm";
@Entity()
export class Member {

    @PrimaryGeneratedColumn()
    Userid: number;

    @Column()
    firstname:string

    @Column()
    lastname:string

    @Column()
    username:string

    @Column()
    password:string
}